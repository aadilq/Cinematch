import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';




const Navbar = () => {
  return (
    <nav className='bg-secondary py-4 shadow-md'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
            <link to="/" className='flex items-center space-x-2 text-xl font-bold'>
            <FaFilm className="text-accent text-2xl"/>
            <span className='bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent'>
                CineMatch
            </span>
            </link>
            <div className='hidden md:flex space-x-6'>
                <link to="/" className='text-gray-300 hover:text-white transition-colors'>
                Home
                </link>
                <link to="/popular" className='text-gray-300 hover:text-white transition-colors'>
                Popular
                </link>
                <link to="/about" className='text-gray-300 hover:text-white transition-colors'>
                About
                </link>
            </div>

            <button className='md:hidden text-gray-300 hover:text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>
    </nav>
  )
}

export default Navbar


