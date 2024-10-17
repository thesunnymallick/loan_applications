import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex items-center gap-3 p-8'>
    <Link to={"/admin/login"} 
    className='w-[20%] h-10 bg-blue-600 text-white rounded-lg flex justify-center items-center'>Admin Login</Link>
    <Link to={"/sales-executive/login"} className='w-[20%] h-10 bg-orange-600 text-white rounded-lg flex justify-center items-center'>Sales Executive Login</Link>
    <Link to={"/relationship-manager/login"} className='w-[20%] h-10 bg-green-600 text-white rounded-lg flex justify-center items-center'>RM login</Link>
    <Link to={"/partner/login"} className='w-[20%] h-10 bg-yellow-600 text-white rounded-lg flex justify-center items-center'>Partner login</Link>
    </div>
  )
}

export default Home