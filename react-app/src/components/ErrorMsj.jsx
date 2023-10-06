import React from 'react'

const ErrorMsj = ({ children }) => {
  return (
    <div className='bg-red-800 text-white text-center px-10 py-3 uppercase font-bold mb-3 rounded-md'>
      { children }
    </div>
  )
}

export default ErrorMsj