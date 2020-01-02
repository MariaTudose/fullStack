import React from 'react'
import PropTypes from 'prop-types'

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

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BlogForm