import React from 'react'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
  return (
    <div className='sticky top-0 z-50 border-b-[1px] border-zinc-200 bg-white'>
        <div
     className='container mx-auto flex justify-between items-center py-3'
    >
    <h1 className='text-zinc-900 font-semibold text-2xl'>Logo</h1>

    <ul className='flex items-center gap-10'>
       <Link className='text-zinc-700 text-lg font-medium hover:text-green-700'>Home</Link>
       <Link className='text-zinc-700 text-lg font-medium hover:text-green-700'>About</Link>
       <Link className='text-zinc-700 text-lg font-medium hover:text-green-700'>Contact</Link>
       <Link className='text-zinc-700 text-lg font-medium hover:text-green-700'></Link>
    </ul>
    </div>
    </div>
  )
}

export default HomeNavbar