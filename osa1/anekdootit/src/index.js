import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const arrLen = props.anecdotes.length
    const [votes, setVote] = useState(new Array(arrLen).fill(0))
    

    const handleClick = () => {
        let next = Math.round(Math.random()*(arrLen-1))
        setSelected(next)
    }

    const handleVote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVote(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <Button text="vote" handleClick={handleVote} />
            <Button text="next anecdote" handleClick={handleClick} />
            <h1>Anecdote with most votes</h1>
            {props.anecdotes[votes.indexOf(Math.max(...votes))]}
            <p>has {Math.max(...votes)} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)