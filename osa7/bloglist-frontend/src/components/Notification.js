import React from 'react'

const Notification = ({ notification }) => {
  if (!notification.msg) {
    return null
  }

  return (
    <div className={`notification ${notification.style}`}>
      {notification.msg}
    </div>
  )
}

export default Notification