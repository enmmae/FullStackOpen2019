import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

/* 7.13 tyylit, step1 */
/* Tee sovelluksesi ulkoasusta tyylikkäämpi jotain kurssilla esiteltyä tapaa käyttäen */

import { Container, Menu, Button } from 'semantic-ui-react'

/* 7.14 tyylit, step2 */
/* Jos käytät tyylien lisäämiseen noin tunnin aikaa, merkkaa myös tämä tehtävä tehdyksi. */

/* 7.15 ESLint */
/* Konfiguroi frontend käyttämään ESLintiä */

import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, removeUser } from './reducers/userReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()

    // ehto useEffectin sisällä aiheuttaa: Warning: Can't perform a React state update on an unmounted component
    if (props.user) {
      blogService.setToken(props.user.token)
    }
  }, [])

  const handleLogout = () => {
    console.log('Logging out')
    props.removeUser()
  }

  return (
    <Container>
      <Router>
        {props.user === null ?
          <div></div> :
          <NavigationMenu user={props.user} handleLogout={handleLogout} />
        }

        <h1>Blog app</h1>

        <Notification />

        {props.user === null ?
          <LoginForm /> :
          <div>
            <Togglable buttonLabel="new blog">
              <BlogForm />
            </Togglable><br></br>
            <Route exact path="/" render={() => <BlogList />} />
            <Route exact path="/:id" render={({ match }) =>
              <Blog blog={props.blogs.find(blog => blog.id === match.params.id)} />
            } />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={props.users.find(user => user.id === match.params.id)} />
            } />
          </div>
        }
      </Router>
    </Container>
  )
}

/* 7.10 navigointi */
/* Tee sovellukseen navigaatiomenu */

const NavigationMenu = ({ user, handleLogout }) => {
  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">users</Link>
      </Menu.Item>
      <Menu.Item>
        {user.name} logged in <Button secondary onClick={() => handleLogout()}>logout</Button>
      </Menu.Item>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs,
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  {
    setUser,
    removeUser,
    initializeUsers,
    initializeBlogs
  }
)(App)
