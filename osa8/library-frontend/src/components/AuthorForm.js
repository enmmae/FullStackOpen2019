import React, { useState } from 'react'
import Select from 'react-select'

/* 8.11: Kirjailijan syntymävuosi */
/* Tee sovellukseen mahdollisuus asettaa kirjailijalle syntymävuosi. Voit tehdä syntymävuoden asettamista */
/* varten oman näkymän tai sijoittaa sen kirjailijat näyttävälle sivulle */

/* 8.12: Kirjailijan syntymävuosi advanced */
/* Tee syntymävuoden asetuslomakkeesta select-tagin, kirjaston react-select tai jonkun muun mekanismin avulla */
/* sellainen, että syntymävuoden voi asettaa ainoastaan olemassaolevalle kirjailijalle. */

const AuthorForm = ({ show, result, editAuthor }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    console.log('update author...')

    await editAuthor({
      variables: { name, born }
    })
    
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            options={authors.map(author => ({ label: author.name, value: author.name }))}
            onChange={({ value }) => setName(value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
