import React, { useEffect } from 'react'

export default function Notification({ message, type, onClose }) {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${bgColor} text-white px-4 py-2 rounded shadow-md fixed top-4 right-4 z-50`}>
      {message}
    </div>
  )
}
