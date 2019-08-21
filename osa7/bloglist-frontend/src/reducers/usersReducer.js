import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data.sort((a, b) => b.blogs.length - a.blogs.length)
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer
