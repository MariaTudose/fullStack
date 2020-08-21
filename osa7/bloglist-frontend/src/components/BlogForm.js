import React from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import  { useField } from '../hooks'

import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ addBlog, setNotification }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createBlog = e => {
    e.preventDefault()
    blogService
      .create({ title: title.value, author: author.value, url: url.value })
      .then(data => {
        addBlog(data)
        setNotification(`A new blog ${data.title} by ${data.author} added`, 'success')
        clearFields()
      })
  }

  const clearFields = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input {...title.inputProps}/>
      </div>
      <div>
        author:
        <input {...author.inputProps} />
      </div>
      <div>
        url:
        <input {...url.inputProps} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)