import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <>
                <p>Ei yhtään palautetta annettu </p>
            </>
        )
    }
    const total = good + neutral + bad
    return (
        <table>
            <tbody>
                <Statistic text="hyvä" value={good} />
                <Statistic text="neutraali" value={neutral} />
                <Statistic text="huono" value={bad} />
                <Statistic text="yhteensä" value={total} />
                <Statistic text="keskiarvo" value={(good - bad)/total} />
                <Statistic text="positiivisia" value={Math.round(good / total * 100) + ' %'} />
            </tbody>
        </table>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr><td>{text}</td> 
        <td>{value}</td></tr>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <>
            <h1>Anna palautetta</h1>
            <Button handleClick={handleGoodClick} text='hyvä' />
            <Button handleClick={handleNeutralClick} text='neutraali' />
            <Button handleClick={handleBadClick} text='huono' />
            <h1>Statistiikka</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)