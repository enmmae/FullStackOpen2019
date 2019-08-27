import React, { useState } from 'react'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id
  title
  author {
    id
    name
    born
    bookCount
  }
  published 
  genres
}
`

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
    ...BookDetails
  }
}
${BOOK_DETAILS} 
`

const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS} 
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

/* 8.24: Subscriptionit client, osa 1 */
/* Ota clientillä käyttöön subscriptiot ja tilaa bookAdded. Uusien kirjojen tullessa anna ilmoitus käyttäjälle. */

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const client = useApolloClient()

  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  
  const books = useQuery(ALL_BOOKS)

  /*
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })*/

  /* 8.25: Subscriptionit client, osa 2 */
  /* Pidä sovelluksen käyttöliittymä ajantasaisena, kun palvelin tiedottaa uusista kirjoista. */

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: ALL_BOOKS }]
  })
  
  const me = useQuery(ME)

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
      />
      
      <AuthorForm
        show={(page === 'authors' && token)}
        result={authors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />
      
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={setToken}
      />

      <Recommendations
        show={page === 'recommend'}
        result={me}
        booksResult={books}
      />
    </div>
  )
}

export default App
