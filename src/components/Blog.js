import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
      {showDetails && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br/>
          {blog.likes} likes 
          <button>like</button>
          <br/>
          added by {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog