import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    const [ counter, setCounter ] = useState(0)
    const setToValue = (value) => setCounter(value)
    
    return (
        <div>
            <Display counter={counter}/>
            <Button handleClick={() => setToValue(counter + 1)}
                text='plus'
            />
            <Button handleClick={() => setToValue(0)}
                text='zero'
            />
        </div>
    )
  }
  
  let counter = 1
  
  ReactDOM.render(
    <App counter={counter} />, 
    document.getElementById('root')
  )


ReactDOM.render(<App />, document.getElementById('root'))