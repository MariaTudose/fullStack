import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs' 

const blogFields = {title: '', author: '', url: ''}

function App() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(blogFields)
  const [notification, setNotification] = useState({msg: "", style: ""})

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNotificationMsg("wrong credentials", "error")
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken("")
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = e => {
    e.preventDefault()
    blogService
      .create(newBlog)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlog(blogFields)
        setNotificationMsg(`A new blog ${data.title} by ${data.author} added`, "success")
      })
  }

  const handleBlogChange = ({value, name}) => {
    setNewBlog({...newBlog, [name]: value})
  }

  const setNotificationMsg = (msg, style) => {
    setNotification({msg, style})
    setTimeout(() => {
      setNotification({msg: "", style: ""})
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

  return (
    <div>
      <Notification msg={notification.msg} style={notification.style} />
      {(user === null) ? (
          <div>
            <h2>Log in to application</h2>
            {loginForm()}
          </div>
        ) : (
          <div>
            <h2>Blogs</h2>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="new blog">
              <BlogForm addBlog={addBlog} newBlog={newBlog} handleChange={handleBlogChange} />
            </Togglable>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
            )}
          </div>
      )}
    </div>
  )
}

export default App;
