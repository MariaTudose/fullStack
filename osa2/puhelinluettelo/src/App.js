import React, { useState, useEffect } from 'react'
import contactsService from './services/contacts'
import Contacts from './components/contact'
import Filter from './components/filter'
import ContactForm from './components/contactForm'

const Notification = ({ message, style }) => {
    const notificationStyle = {
        color: style ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderSadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

const App = () => {
    const [contacts, setContacts] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        contactsService
            .getContacts()
            .then(contacts => setContacts(contacts))
            .catch(error => {
                handleNotification('kuts')
                setIsError(true)
            })
    }, [])

    const handleNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification(null)
        }, 2000)
    }

    const addcontact = (event) => {
        event.preventDefault()
        if (contacts.filter(contact => contact.name === newName).length) {
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                let oldContact = contacts.find(contact => contact.name === newName)
                let newContact = {
                    "name": newName,
                    "number": newNumber,
                    "id": oldContact.id
                }
                contactsService.updateContact(oldContact.id, newContact)
                .then(response =>
                    setContacts(contacts.map(c => c.id === oldContact.id ? newContact : c)),
                    handleNotification(`Päivitettiin numero henkilölle ${newName}`),
                )
                .catch(error => {
                    handleNotification(`Henkilö ${oldContact.name} oli jo poistettu`)
                    setIsError(true)
                })
            }
        } else {
            const newContact = { 'name': newName, 'number': newNumber }
            contactsService.createContact(newContact)
            .then(contact =>
                setContacts(contacts.concat(contact)),
                handleNotification(`Lisättiin ${newName}`)
            )
            .catch(error => {
                handleNotification(`Käyttäjän ${newName} lisääminen epäonnistui`)
                setIsError(true)
            })
        }
    }

    const deleteContact = (contact) => {
        if (window.confirm(`Poistetaanko ${contact.name}?`)) {
            contactsService.deleteContact(contact)
            .then(response =>
                setContacts(contacts.filter(c => c.id !== contact.id)),
                handleNotification(`Poistettiin ${contact.name}`)
            )
            .catch(error => {
                handleNotification(`Henkilöä ${contact.name} ei voitu poistaa`)
                setIsError(true)
            })
        }
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
            <Notification message={notification} style={isError} />
            <Filter filter={filter} handleFilter={handleFilter} />
            <h3>lisää uusi</h3>
            <ContactForm handleNameChange={handleNameChange}
                newName={newName}
                handleNumberChange={handleNumberChange}
                newNumber={newNumber}
                addcontact={addcontact}
            />
            <h3>Numerot</h3>
            <Contacts contacts={contacts} filter={filter} deleteContact={deleteContact} />
        </div>
    )
}

export default App