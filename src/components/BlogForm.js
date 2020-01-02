import React from 'react'

const BlogForm = ({ addBlog, newBlog, handleChange }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        name="title"
        value={newBlog.title}
        onChange={({target}) => handleChange(target)}
      />
    </div>
    <div>
      author:
      <input
        name="author"
        value={newBlog.author}
        onChange={({target}) => handleChange(target)}
      />
    </div>
    <div>
      url:
      <input
        name="url"
        value={newBlog.url}
        onChange={({target}) => handleChange(target)}
      />
    </div>
    <button type="submit">create</button>
  </form> 
)


export default BlogForm