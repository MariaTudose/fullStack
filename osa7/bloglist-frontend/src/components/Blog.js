import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, useParams } from "react-router-dom"
import blogService from '../services/blogs'

import { getBlog, getBlogs, likeBlog, setBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ user, blogs, likeBlog, getBlog, getBlogs, setBlogs, setNotification }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }

  const id = useParams().id

  useEffect(() => {
    getBlog(id)
  }, [getBlog, id])

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  const handleRemove = id => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() =>
          setBlogs(blogs.all.filter(blog => blog.id !== id))
        )
        .catch(e => setNotification(e.response.data.error, 'error'))
    }
  }

  return (
    <div style={blogStyle}>
      {blogs.details &&
        <div>
          <h2>{blogs.details.title}</h2>
          <a href={blogs.details.url}>{blogs.details.url}</a>
          <br/>
          {blogs.details.likes} likes
          <button onClick={() => likeBlog(blogs.details.id, blogs.details.likes)}>like</button>
          <br/>
          added by {blogs.details.user.name}
          {user.name === blogs.details.user.name && <button onClick={() => handleRemove(blogs.details.id)}>remove</button>}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  getBlog,
  getBlogs,
  likeBlog,
  setBlogs,
  setNotification
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))