import React from 'react'

const ContactForm = props => {
    return (
        <form onSubmit={props.addcontact}>
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

export default ContactForm