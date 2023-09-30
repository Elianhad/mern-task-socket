import React from 'react'

const Error = (msg) => {
  return (
    <span className='bg-red-600 font-semibold text-md text-white p-2 rounded-sm'>{ msg }</span>
  )
}

export default Error