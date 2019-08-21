import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import PropTypes from 'prop-types'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /* 5.1: blogilistan frontend, step1 */
  /* Toteuta frontendiin kirjautumisen mahdollistava toiminnallisuus. */
  /* Kirjautumisen yhteydessä backendin palauttama token tallennetaan sovelluksen tilaan user. */

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)

    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setError('error')
    }
  }

  /* 5.2: blogilistan frontend, step2 */
  /* Tee kirjautumisesta "pysyvä" local storagen avulla. Tee sovellukseen myös mahdollisuus uloskirjautumiseen */

  const handleLogout = () => {
    console.log('Logging out')
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} error={error}/>

      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password}/> :
        <div>
          <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
          <Togglable buttonLabel="new blog">
            <CreateBlogForm blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} setError={setError}/>
          </Togglable><br></br>
          <BlogForm blogs={blogs} user={user}/>
        </div>
      }
    </div>
  )
}

/* 5.18: blogilista ja hookit step1 */
/* Yksinkertaista sovelluksesi kirjautumislomakkeen käyttöä äsken määritellyn useField custom hookin avulla. */

const LoginForm = ({ username, password, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username <input {...username.bind}/>
      </div>
      <div>
        password <input {...password.bind}/>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

/* 5.8*: blogilistan frontend, step8 */
/* Järjestä sovellus näyttämään blogit likejen mukaisessa suuruusjärjestyksessä. Järjestäminen onnistuu taulukon metodilla sort. */

const BlogForm = ({ blogs, user }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {blogs.map(blog =>
        <Blog buttonLabel={blog.id} key={blog.id} blog={blog} user={user}/>
      )}
    </div>
  )
}

/* 5.5 blogilistan frontend, step5 */
/* Tee blogin luomiseen käytettävästä lomakkeesta ainoastaan tarvittaessa näytettävä */

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

/* 5.11: blogilistan frontend, step11 */
/* Määrittele joillekin sovelluksesi komponenteille PropTypet. */
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

/* 5.3: blogilistan frontend, step3 */
/* Laajenna sovellusta siten, että kirjautunut käyttäjä voi luoda uusia blogeja */

const CreateBlogForm = ({ blogs, setBlogs, setErrorMessage, setError }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreate = (event) => {
    event.preventDefault()
    console.log('Creating new blog')

    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setErrorMessage(`a new blog ${title.value} by ${author.value} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setError('success')
        title.reset()
        author.reset()
        url.reset()
      })
  }

  /* 5.19: blogilista ja hookit step2 */
  /* Ota hook käyttöön myös uuden blogin luovassa formissa. */

  return (
    <form onSubmit={handleCreate}>
      <h2>Create new</h2>
      <div>
        title <input {...title.bind}/>
      </div>
      <div>
        author <input {...author.bind}/>
      </div>
      <div>
        url <input {...url.bind}/>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

/* 5.4*: blogilistan frontend, step4 */
/* Toteuta sovellukseen notifikaatiot, jotka kertovat sovelluksen yläosassa onnistuneista ja */
/* epäonnistuneista toimenpiteistä. */

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={error}>
      {message}
    </div>
  )
}

export default App
