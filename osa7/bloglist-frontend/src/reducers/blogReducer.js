import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

/* 7.5 redux, step2 */
/* Siirrä blogien tietojen talletus Reduxiin. Kirjautumisen ja uuden blogin luomisen lomakkeiden */
/* tilaa voit halutessasi hallita edelleen Reactin tilan avulla. */

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state
      .map(blog => blog.id === action.data.id ? action.data : blog)
      .sort((a, b) => b.likes - a.likes)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5000)
    )
  }
}

export const addLike = blog => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(blog.id, newBlog)

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(id, comment)

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export default blogReducer