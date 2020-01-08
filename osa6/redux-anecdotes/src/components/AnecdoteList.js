import React from 'react';

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState()

  const toggleNotification = (message) => {
    props.store.dispatch(setNotification(message))
    setTimeout(() => {
      props.store.dispatch(setNotification(''))
    }, 5000)
  }

  const vote = (anecdote) => {
    props.store.dispatch(voteAnecdote(anecdote.id))
    toggleNotification(`you voted ${anecdote.content}`)
  }

  const applyFilterAndSort = (anecdotes) => (
    [...anecdotes]
      .filter(a => a.content.toLowerCase().includes(filter))
      .sort((a, b) => a.votes > b.votes ? -1 : 1)
  )

  return (
    <div>
      {applyFilterAndSort(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList