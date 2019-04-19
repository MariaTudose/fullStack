import axios from 'axios'
const baseURL = 'http://localhost:3001/contacts'

const getContacts = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createContact = (newContact) => {
    const request = axios.post(baseURL, newContact)
    return request.then(response => response.data)
}

const updateContact = (id, newContact) => {
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(response => response.data)
}

const deleteContact = (contact) => {
    return axios.delete(`${baseURL}/${contact.id}`)
}
 

export default { getContacts, createContact, updateContact, deleteContact}