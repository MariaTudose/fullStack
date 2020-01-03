import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import  { useField } from '../hooks'

const LoginForm = ({ saveUser, setNotificationMsg }) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      saveUser(user)
    } catch (e) {
      setNotificationMsg('wrong credentials', 'error')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username.inputProps} />
        </div>
        <div>
          password
          <input {...password.inputProps} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm