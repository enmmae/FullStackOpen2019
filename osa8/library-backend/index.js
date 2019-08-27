/* 8.13: Tietokanta, osa 1 */
/* Muuta kirjastosovellusta siten, että se tallettaa tiedot tietokantaan. */

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = config.MONGODB_URI
const JWT_SECRET = config.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    published: Int
    author: Author!
    genres: [String]
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    
    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

/* 8.23: Subscriptionit palvelin */
/* Tee palvelimelle toteutus subscriptiolle bookAdded, joka palauttaa tilaajilleen lisättyjen kirjojen tiedot. */

/* 8.14: Tietokanta, osa 2 */
/* Täydennä sovellusta siten, että kaikki kyselyt (paitsi kyselyn allBooks parametri author) sekä mutaatiot toimivat. */

const resolvers = {
  Query: {
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }
      else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: { $in: author.id } }).populate('author')
      }
      else if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate('author')
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  /* 8.26: n+1 */
  /* Ratkaise haluamallasi menetelmällä seuraavaa kyselyä vaivaava n+1-ongelma */

  /*
  Author: {
    bookCount: root => Book.find({ author: { $in: root.id } }).countDocuments()
  },*/

  /* 8.15 Tietokanta, osa 3 */
  /* Täydennä sovellusta siten, että tietokannan validointivirheet (esim. liian lyhyt kirjan tai kirjailijan nimi) */
  /* käsitellään järkevästi, eli niiden seurauksena heitetään poikkeus UserInputError, jolle asetetaan sopiva virheviesti. */

  Mutation: {
    addBook: async (root, args, { currentUser }) => {  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const book = new Book({ ...args })

      // Jos kirjailijaa ei löydy, yritetään luoda uusi
      const check = await Author.findOne({ name: args.author })
      if (!check) {
        try {
          const newAuthor = new Author({ name: args.author, bookCount: 0 })
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      // Kun kirjailija löytyy, voidaan tallentaa kirja kirjailijan tietojen kanssa
      try {
        const author = await Author.findOne({ name: args.author })
        book.author = author.id

        await book.populate('author').execPopulate()
        await book.save()
        
        author.bookCount = author.bookCount + 1
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    /* 8.16 käyttäjä ja kirjautuminen */
    /* Lisää järjestelmään käyttäjienhallinta. */
    /* Tee mutaatiot addBook ja editAuthor mahdollisiksi ainoastaan, jos pyynnön mukana lähetetään validi token. */

    editAuthor: async (root, args, { currentUser }) => {  
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })

      try {
        author.born = args.setBornTo
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
