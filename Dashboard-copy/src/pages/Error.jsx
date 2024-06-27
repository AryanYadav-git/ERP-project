import React from 'react'

const Error = () => {
  return (
    <div className='grid place-items-center w-full h-screen'>
      <div className="flex items-center flex-col gap-2">
        <h1 className='text-3xl font-bold'>Error loading this Page</h1>
        <div className="flex items-center flex-col">
          <p className='text-sm text-gray-600'>This page doesn't exist </p>
          <p className='text-sm text-gray-600'>or</p>
          <p className='text-sm text-gray-600'>Login again</p>
        </div>
        
      </div>
      
    </div>
  )
}

export default Error