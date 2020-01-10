
const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

const showNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}
export const setNotification = (message, t) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, t * 1000)
  }
}

export default reducer