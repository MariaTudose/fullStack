import React, { useState, useEffect } from 'react';
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs' 


function App() {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user);
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('wrong credentials')
    }
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

  return (
    <div>
      {(user === null) ? (
          <div>
            <h2>Log in to application</h2>
            {loginForm()}
          </div>
        ) : (
          <div>
            <h2>Blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      )}
    </div>
  )
}

export default App;
