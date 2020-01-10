import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote =>
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

const applyFilterAndSort = ({ anecdotes, filter }) => (
  [...anecdotes]
    .filter(a => a.content.toLowerCase().includes(filter))
    .sort((a, b) => a.votes > b.votes ? -1 : 1)
)

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    anecdotesToShow: applyFilterAndSort(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)