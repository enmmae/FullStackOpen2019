import React, { useState } from 'react'
import blogService from '../services/blogs'

/* 5.6* blogilistan frontend, step6 */
/* Laajenna blogien listausta siten, että klikkaamalla blogin nimeä, sen täydelliset tiedot aukeavat */

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [userName] = useState(blog.user === undefined ? blog.author : blog.user.name)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /* 5.7*: blogilistan frontend, step7 */
  /* Toteuta like-painikkeen toiminnallisuus. Like lisätään backendiin blogin yksilöivään urliin tapahtuvalla PUT-pyynnöllä. */

  const handleLike = () => {
    console.log('Adding a like')

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    blogService
      .update(blog.id, blogObject)
      .then(data => {
        console.log(data)
      })
  }

  /* 5.9*: blogilistan frontend, step9 */
  /* Lisää nappi blogin poistamiselle. Toteuta myös poiston tekevä logiikka. */

  /* 5.10*: blogilistan frontend, step10 */
  /* Näytä poistonappi ainoastaan jos kyseessä on kirjautuneen käyttäjän lisäämä blogi. */

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true) {
      console.log('Deleting a blog')

      blogService
        .deleteBlog(blog.id)
        .then(data => {
          console.log(data)
        })
    }
  }

  // HUOM: like ja remove napit eivät päivity sivulla ilman refreshausta tiettyjen toimintojen jälkeen.

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility} className='default'>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} onClick={toggleVisibility} className='hidden'>
        {blog.title} {blog.author}<br></br>
        {blog.url}<br></br>
        {blog.likes} <button onClick={handleLike}>like</button><br></br>
        added by {userName}<br></br>
        {blog.user !== undefined && blog.user.username === user.username ?
          <button onClick={handleDelete}>remove</button>
          :
          <div></div>
        }
      </div>
    </div>
  )
}

export default Blog