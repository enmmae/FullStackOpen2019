import React, { useState, useEffect } from 'react'

import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

/* 8.21 genren kirjat GraphQL:llä */
/* Tietyn genren kirjoihin rajoittamisen voi tehdä kokonaan React-sovelluksen puolella. Voit merkitä tämän */
/* tehtävän, jos rajaat näytettävät kirjat tehtävässä 8.5 palvelimelle toteutetun suoran GraphQL-kyselyn avulla. */

const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

/* 8.9: Kirjojen näkymä */
/* Toteuta kirjojen näkymä, eli näytä sivulla kirjoista muut tiedot paitsi genret */

/* 8.17 Kirjojen lista */
/* Backendin muutosten jälkeen kirjojen lista ei enää toimi. Korjaa se. */

const Books = ({ show, result }) => {
  const client = useApolloClient(BOOKS_BY_GENRE)

  const [allGenres, setAllGenres] = useState([])
  const [genre, setGenre] = useState('all genres')
  const [books, setBooks] = useState([])

  const initialize = async () => {
    const { data } = await client.query({
      query: BOOKS_BY_GENRE
    })
    setBooks(data.allBooks)

    const genres = [...new Set(data.allBooks.map(book => book.genres).flat())]
    setAllGenres(genres)
  }

  useEffect(() => {
    initialize()
  }, [])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  /* 8.19 genren kirjat, osa 1 */
  /* Laajenna sovellustasi siten, että kirjojen näkymästä voidaan rajata näytettävä kirjalista ainoastaan niihin, jotka kuuluvat valittuun genreen. */
  
  const showBooksByGenre = async (genre) => {
    if (genre) {
      genre = genre.genre
    }
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre: genre }
    })
    setBooks(data.allBooks)
    setGenre(genre === null ? 'all genres' : genre)
  }

  // const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {allGenres.map(genre => (
        <button key={genre} onClick={() => { showBooksByGenre({genre}) }}>{genre}</button>
      ))}
      <button onClick={() => { showBooksByGenre(null) }}>all genres</button>
    </div>
  )
}

export default Books
