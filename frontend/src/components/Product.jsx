import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <div>
            <div className='flex flex-col border w-72 group overflow-hidden'>
                <Link className='relative flex h-72 w-72' to='/'>
                    <img className='absolute top-0 right-0 h-full w-full object-cover' src={ product.img } alt='img' />
                    <div className='absolute -right-11 bottom-3 space-y-3 transition-all duration-500 group-hover:right-3'>
                        <button className='flex h-8 w-8 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700'>
                            <FaHeart />
                        </button>
                        <button className='flex h-8 w-8 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700'>
                            <FaShoppingCart />
                        </button>
                    </div>
                </Link>
                <div className='mx-10 my-2'>
                    <Rating value={ product.rating } />
                    <Link to='/'>
                        <h5 className='overflow-hidden text-ellipsis whitespate-nowrap text-center text-gray-700 mt-1'>{ product.name }</h5>
                        <h5 className='text-center font-bold text-gray-900 mt-1'>${ product.price }</h5>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Product