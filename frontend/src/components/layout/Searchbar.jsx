import { useState, useNavigate } from 'react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';




const Searchbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (query.trim()){
            navigate(`/search?query=${encodeURIComponent(query.trim())}`); // Navigate to search results page
            setQuery(''); //Want to clear the search input
        }
    };

  return (
    <div className='w-full max-w-3xl mx-auto px-4'>
        <form onSubmit={handleSubmit} className='relative'>
            <input 
            type='text'
            value = {query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search for Movies'  
            className='search-input pl-12'
            aria-label='Search movies'
            /> 
            <FaSearch className = "absolute left-4 top-1/2 transform -translate-y-12 text-gray-400"/>
            <button  
            type='submit'
            className='absolute right-2 top-1/2 transform -translate-y-12 bg-primary hover:bg-primary-dark text-white px-4 py-1 rounded-md'
            aria-label="Submit search">
                Search
            </button>
        </form>
    </div>
  )
}

export default Searchbar

