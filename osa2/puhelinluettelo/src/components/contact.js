import React from 'react'

const Contact = ({ contact, deleteContact }) => {  
    return (
        <li key={contact.name}>
        {contact.name}{' '}
        {contact.number}{' '} 
        <button onClick={() => deleteContact(contact)}>poista</button>
        </li>
    )
}

const Contacts = ({ contacts, filter, deleteContact }) => {
    let filteredContacts = contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    return (
        <ul>
        {filteredContacts.map(contact =>
                <Contact
                    key={contact.name}
                    contact={contact}
                    deleteContact={deleteContact} />)}
        </ul>
    )
}



export default Contacts