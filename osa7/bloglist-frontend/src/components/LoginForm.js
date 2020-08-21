import React from 'react'
import { connect } from 'react-redux'

import loginService from '../services/login'
import blogService from '../services/blogs'
import  { useField } from '../hooks'

import { setNotification } from '../reducers/notificationReducer'


const LoginForm = ({ saveUser, setNotification }) => {
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
      setNotification('wrong credentials', 'error')
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)