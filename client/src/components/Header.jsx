import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'

const Header = () => {

  const {userData}=useContext(AppContent)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>

      <img src={assets.header_img} alt=""
      className='w-36 h-36 rounded-full mb-6 ' />

      <h1 className='flex items-center gap-2 text-xl sm:text-3xl  font-medium mb-2 text-indigo-200'>Hey {userData ? userData.name:'Developer'}! </h1> 

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4  text-indigo-600'>Welcome</h2> 

      

      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-600 transition-all  text-white'>Get started</button>
    </div>
  )
}

export default Header
