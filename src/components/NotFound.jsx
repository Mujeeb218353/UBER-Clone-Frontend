import React from 'react'

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center flex-col gap-20' data-theme={`${localStorage.getItem("my-theme")}`}>
      <h1 className='text-4xl font-bold'>404</h1>
      <h1 className='text-4xl font-bold'>Page Not Found</h1>
    </div>
  )
}

export default NotFound