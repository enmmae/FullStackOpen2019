import React from 'react'

/* 8.8: Kirjailijoiden näkymä */
/* Toteuta kirjailijoiden näkymä, eli näytä sivulla kaikkien kirjailijoiden tiedot */

const Authors = ({ show, result }) => {
  if (!show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
