import React, { useState, useEffect } from 'react'

/* 8.20 genren kirjat */
/* Tee sovellukseen näkymä, joka näyttää kirjautuneelle käyttäjälle käyttäjän lempigenreen kuuluvat kirjat. */

const Recommendations = ({ show, result, booksResult }) => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  
  useEffect(() => {
    if (result.data.me) {
      setFavoriteGenre(result.data.me.favoriteGenre)
    }
  }, [result.data.me])

  if (!show) {
    return null
  }
  
  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h1>recommendations</h1>

      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {booksResult.data.allBooks.map(a => a.genres.includes(favoriteGenre) ?
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            : <tr key={a.title}></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
