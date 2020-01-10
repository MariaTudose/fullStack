import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedAnecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    case 'NEW_ANECDOTE':
      const anecdote = action.data
      return  [ ...state, anecdote ]
    case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer