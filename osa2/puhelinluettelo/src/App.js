import React, { useState, useEffect } from 'react'
import contactsService from './services/contacts'
import Contacts from './components/contact'
import Filter from './components/filter'
import ContactForm from './components/contactForm'

const App = () => {
    const [contacts, setContacts] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        contactsService
        .getContacts()
        .then(contacts => setContacts(contacts))
    }, [])


    const addcontact = (event) => {
        event.preventDefault()
        if (contacts.filter(contact => contact.name === newName).length) {
            if(window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                let oldContact = contacts.find(contact => contact.name === newName)
                let newContact = {
                    "name": newName,
                    "number": newNumber
                }
                contactsService.updateContact(oldContact.id, newContact).then(response =>
                    setContacts(contacts.map(c => c.id === oldContact.id ? newContact : c))
                )
            }
        } else {
            const newContact = {'name':newName, 'number':newNumber}
            contactsService.createContact(newContact).then(contact =>
                setContacts(contacts.concat(contact))    
            )
        }
    }

    const deleteContact = (contact) => {
        if(window.confirm(`Poistetaanko ${contact.name}?`)) {
            contactsService.deleteContact(contact).then(response =>
                setContacts(contacts.filter(c => c.id !== contact.id))
                )
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