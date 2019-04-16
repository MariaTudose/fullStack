import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Persons = ({ persons, filter }) => {
    return (
        <ul>{persons
            .filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
            .map(person => <li key={person.name}>{person.name} {person.number}</li>)}</ul>
    )
}

const PersonForm = props => {
    return (
        <form onSubmit={props.addPerson}>
            <div>
                nimi: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>numero: <input value={props.newNumber} onChange={props.handleNumberChange} /></div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const Filter = ({ filter, handleFilter }) => {
    return (
        <div>
            rajaa näytettäviä <input value={filter} onChange={handleFilter} />
        </div>
    )
}


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }

    useEffect(hook, [])


    const addPerson = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name === newName).length) {
            alert(`${newName} on jo luettelossa`)
        } else setPersons(persons.concat({ 'name': newName, 'number': newNumber }))
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Filter filter={filter} handleFilter={handleFilter} />
            <h3>lisää uusi</h3>
            <PersonForm handleNameChange={handleNameChange}
                newName={newName}
                handleNumberChange={handleNumberChange}
                newNumber={newNumber}
                addPerson={addPerson}
            />
            <h3>Numerot</h3>
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App