import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

/* 7.6 redux, step3 */
/* Siirrä myös kirjautuneen käyttäjän tietojen talletus Reduxiin. */

const userReducer = (
  state = JSON.parse(window.localStorage.getItem('loggedBlogappUser')),
  action
) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user ? action.user : null
  default:
    return state
  }
}

export const setUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username: username, password: password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      dispatch({
        type: 'SET_USER',
        user
      })
    } catch (exception) {
      dispatch(
        setNotification('wrong username or password', 5000)
      )
    }
  }
}

export const removeUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({
      type: 'SET_USER',
      user: null
    })
  }
}

export default userReducer
