import React from 'react'
import './index.css'
const Tailwindtest = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-center gap-5 align-center min-h-screen bg-white text-black'>
      <h1 className='tailwind text-2xl text-blue-600 hover:text-red-600 p-10 shadow-gray-sm'>Hello Tailwind</h1>
      <h1 className='lg:opacity-1 text-1xl shadow-xl' >This is Tailwind</h1>
      <img className='shadow-lg' style={{height:"450px"}} src='https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
    </div>
  )
}

export default Tailwindtest
