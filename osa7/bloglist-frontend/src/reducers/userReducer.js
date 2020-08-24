import userService from '../services/users'

const initialState = {
  user: null,
  users: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_USER':
      return { ...state, user: action.user}
    case 'SET_ALL_USERS':
      return { ...state, users: action.users}
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'SET_ALL_USERS',
      users
    })
  }
}

export default reducer