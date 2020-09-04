import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

import { getBlogs, createBlog, setBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser, getAllUsers } from './reducers/userReducer'


function App(props) {
  const {
    getBlogs,
    createBlog,
    setUser,
    getAllUsers,
    notification,
    blogs,
    user
  } = props
  
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

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
  }

  const UserView = ({ users }) => {
    const id = useParams().id
    const visibleUser = users.find(u => u.id === id)
    
    if (!visibleUser) {
      return null
    }

    return (
      <div className="content">
        <h2>{visibleUser.name}</h2>
        <h3>Added blogs</h3>
        <ul>{visibleUser.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}</ul>
      </div>
    )
  }

  return (
    <Router>
      <Notification notification={notification} />
      {(user.user === null) ? (
        <LoginForm saveUser={setUser} />
      ) : (
        <div>
          <div className="navbar">
            <div>
              <Link to="/">blogs</Link>
              <Link to="/users">users</Link>
            </div>
            <div>
              <span>{user.user.name} logged in</span>
              <button onClick={handleLogout}>logout</button>
            </div>
          </div>
          <Switch>
            <Route path="/blogs/:id">
              <Blog user={user.user}/>
            </Route>
            <Route path="/users/:id">
              <UserView users={user.users} />
            </Route>
            <Route path="/users">
              <div className="content">
                <h2>Users</h2>
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>Users</th>
                      <th>Blogs created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...user.users].map(user => (
                      <tr key={user.id}>
                        <td><Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link></td>
                        <td>{user.blogs.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Route>
            <Route path="/">
              <div className="content">
                <h2>Blogs</h2>
                <Togglable buttonLabel="new blog">
                  <BlogForm addBlog={createBlog} />
                </Togglable>
                <ul className="blog-list" >
                  {blogs.all.sort((a, b) => b.likes - a.likes).map(blog =>
                    <li key={blog.id} ><Link className="blog-item"to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</li>
                  )}
                </ul>
              </div>
            </Route>
          </Switch>

          
        </div>
      )}
    </Router>
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
  setBlogs,
  setUser,
  setNotification,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
