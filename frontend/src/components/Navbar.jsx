import React from 'react'
import { FaShoppingCart, FaHeart, FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='flex justify-between w-full'>
      <div className='m-6'>Home</div>
      
      <div className='flex'>
        <FaShoppingCart className='m-6' />
        <FaHeart className='my-6 mr-6' />
        <FaUserCircle className='my-6 mr-6'/>
      </div>
    </nav>
  )
}

export default Navbar