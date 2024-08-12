import React from 'react'

export default function Notification({ message, type }) {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-4 right-4 z-50`}>
      {message}
    </div>
  )
}
