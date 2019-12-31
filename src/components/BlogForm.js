import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogFields = {title: '', author: '', url: ''}

const BlogForm = ({ updateBlogs, setNotification }) => {
  const [newBlog, setNewBlog] = useState(blogFields)

  const handleBlogChange = ({value, name}) => {
    setNewBlog({...newBlog, [name]: value})
  }

  const addBlog = e => {
    e.preventDefault()
    blogService
      .create(newBlog)
      .then(data => {
        updateBlogs(data)
        setNewBlog(blogFields)
        setNotification(`A new blog ${data.title} by ${data.author} added`, "success")
      })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name="title"
          value={newBlog.title}
          onChange={({target}) => handleBlogChange(target)}
        />
      </div>
      <div>
        author:
        <input
          name="author"
          value={newBlog.author}
          onChange={({target}) => handleBlogChange(target)}
        />
      </div>
      <div>
        url:
        <input
          name="url"
          value={newBlog.url}
          onChange={({target}) => handleBlogChange(target)}
        />
      </div>
      <button type="submit">create</button>
    </form> 
  )
}

export default BlogForm