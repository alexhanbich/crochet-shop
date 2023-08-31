import React from 'react'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'

const Product = ({ product }) => {
    return (
        <div>
            <div className='flex flex-col border w-fit group overflow-hidden'>
                <a className='relative flex h-72 w-72' href='#'>
                    <img className='absolute top-0 right-0 h-full w-full object-cover' src={ product.img } alt='img' />
                    <div className='absolute -right-11 bottom-3 space-y-3 transition-all duration-500 group-hover:right-3'>
                        <button className='flex h-8 w-8 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700'>
                            <FaHeart />
                        </button>
                        <button className='flex h-8 w-8 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700'>
                            <FaShoppingCart />
                        </button>
                    </div>
                </a>
                <div className='m-3'>
                    <a href='#'>
                        <h5 className='text-center text-gray-700'>{ product.name }</h5>
                        <h5 className='text-center font-bold text-gray-900'>${ product.price }</h5>
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Product