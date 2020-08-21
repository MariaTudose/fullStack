
const initialState = {
  message: null,
  style: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    default:
      return state
  }
}

const showNotification = (msg, style) => {
  return {
    type: 'SET_NOTIFICATION',
    content: {
      msg,
      style
    }
  }
}
export const setNotification = (msg, style) => {
  return async dispatch => {
    dispatch(showNotification(msg, style))
    setTimeout(() => {
      dispatch(showNotification(null))
    }, 5000)
  }
}

export default reducer