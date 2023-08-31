import React from 'react'
import { FaShoppingCart, FaHeart, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between w-full'>
      <Link to='/' className='m-6'>Home</Link>
      <div className='flex'>
        <Link to='/'><FaShoppingCart className='m-6' /></Link>
        <Link to='/'><FaHeart className='my-6 mr-6' /></Link>
        <Link to='/'><FaUserCircle className='my-6 mr-6'/></Link>
      </div>
    </nav>
  )
}

export default Navbar