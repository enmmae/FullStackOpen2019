import React, { useState } from 'react'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    bookCount
    born
  }
}
`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const [page, setPage] = useState('authors')

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <ApolloConsumer>
      {(client =>
        <Query query={ALL_AUTHORS}>
          {(result) =>
            <Authors
              show={page === 'authors'}
              result={result} client={client}
            />
          }
        </Query>
      )}
      </ApolloConsumer>
      
      <Mutation
        mutation={EDIT_AUTHOR}
        refetchQueries={[{ query: ALL_AUTHORS }]}
        onError={handleError}
      >
        {(editAuthor) =>
          <AuthorForm
            show={page === 'authors'}
            editAuthor={editAuthor}
          />
        }
      </Mutation> 

      <ApolloConsumer>
      {(client =>
        <Query query={ALL_BOOKS}>
          {(result) =>
            <Books
              show={page === 'books'}
              result={result} client={client}
            />
          }
        </Query>
      )}
      </ApolloConsumer>

      <Mutation
        mutation={CREATE_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }]}
        onError={handleError}
      >
        {(addBook) =>
          <NewBook
            show={page === 'add'}
            addBook={addBook}
          />
        }
      </Mutation>
    </div>
  )
}
// <Query query={ALL_BOOKS} pollInterval={2000}> <- toinen tapa saada lista päivittymään lisäyksen jälkeen

export default App