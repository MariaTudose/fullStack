import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import { getBlogs, createBlog, likeBlog, setBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

function App({ getBlogs, createBlog, likeBlog, setBlogs, setUser, setNotification, notification, blogs, user }) {

  useEffect(() => {
    getBlogs()
  }, [getBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
  }

  const saveUser = user => setUser(user)

  const handleRemove = id => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() =>
          setBlogs(blogs.filter(blog => blog.id !== id))
        )
        .catch(e => setNotification(e.response.data.error, 'error'))
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {(user === null) ? (
        <LoginForm saveUser={saveUser} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm addBlog={createBlog} />
          </Togglable>
          <div className="blog-list" >
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={likeBlog} handleRemove={handleRemove} user={user}/>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  getBlogs,
  createBlog,
  likeBlog,
  setBlogs,
  setUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
