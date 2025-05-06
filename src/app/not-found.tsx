import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-screen dark:bg-gray-800 bg-gray-300 items-center justify-center-safe text-gray-800 flex flex-col gap-4 dark:text-gray-200'>
        <h1 className="text-7xl">404</h1>
        <p className='text-bold'>The Page Is Not Available</p>
        <Link href="/">Home</Link>
    </div>
  )
}

export default NotFound