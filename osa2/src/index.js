import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise);


ReactDOM.render(<App />,document.getElementById('root'))