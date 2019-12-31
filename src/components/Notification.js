import React from 'react'

const Notification = ({ msg, style }) => {
  if (msg === "") {
    return null
  }

  return (
    <div className={`notification ${style}`}>
      {msg}
    </div>
  )
}

export default Notification 