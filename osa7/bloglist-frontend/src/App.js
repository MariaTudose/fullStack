import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ msg: '', style: '' })

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
  }

  const saveUser = user => setUser(user)

  const addBlog = blog => setBlogs(blogs.concat(blog))

  const setNotificationMsg = (msg, style) => {
    setNotification({ msg, style })
    setTimeout(() => {
      setNotification({ msg: '', style: '' })
    }, 5000)
  }

  const handleLike = (id, likes) => {
    blogService
      .like(id, likes)
      .then(res => {
        const i = blogs.findIndex(blog => blog.id === id)
        const newBlogs = [...blogs]
        newBlogs[i] = res
        setBlogs(newBlogs)
      })
      .catch(e => console.log(e))
  }

  const handleRemove = id => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      blogService
        .remove(id)
        .then(() =>
          setBlogs(blogs.filter(blog => blog.id !== id))
        )
        .catch(e => setNotificationMsg(e.response.data.error, 'error'))
    }
  }

  return (
    <div>
      <Notification msg={notification.msg} style={notification.style} />
      {(user === null) ? (
        <LoginForm saveUser={saveUser} setNotificationMsg={setNotificationMsg} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog">
            <BlogForm addBlog={addBlog} setNotificationMsg={setNotificationMsg} />
          </Togglable>
          <div className="blog-list" >
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
