// src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import SearchBar from '../components/layout/SearchBar';
import MovieGrid from '../components/movies/MovieGrid'; 
import LoadingSpinner from '../components/layout/LoadingSpinner'; 
import { movieService } from '../services/api'; 

const SearchResults = () => { 
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); 

  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [totalResults, setTotalResults] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 

  useEffect(() => { // Hook to run code when dependencies change
    // Search for movies when query changes
    const searchMovies = async () => { 
      if (!query) return; 
      
      try {
        setLoading(true); 
        const data = await movieService.searchMovies(query, currentPage); 
        setMovies(data.results); 
        setTotalResults(data.total_results); 
        setTotalPages(data.total_pages); 
        setError(null); 
      } catch (err) {
        console.error('Error searching movies:', err); 
        setError('Failed to search for movies. Please try again later.'); 
      } finally {
        setLoading(false);
      }
    };

    searchMovies(); 
  }, [query, currentPage]); 

  // Load more results
  const handleLoadMore = () => {
    if (currentPage < totalPages) { 
      setCurrentPage(prevPage => prevPage + 1); 
    }
  };

  return ( 
    <div className="min-h-screen container mx-auto px-4 py-8"> // Full-height container with padding
      <div className="mb-8"> // Add margin below the search bar
        <SearchBar /> // Render search bar component
      </div>
      
      {query && ( 
        <h1 className="text-2xl font-bold mb-6"> 
          Search Results for "{query}" 
          {totalResults > 0 && ( 
            <span className="text-gray-400 text-lg font-normal ml-2"> 
              ({totalResults} results) 
            </span>
          )}
        </h1>
      )}

      {loading && currentPage === 1 ? (
        <LoadingSpinner /> 
      ) : error ? ( 
        <div className="text-center text-red-500 py-10">{error}</div> 
      ) : movies.length === 0 ? ( 
        <div className="text-center py-10"> 
          <p className="text-xl">No results found for "{query}"</p> 
          <p className="text-gray-400 mt-2">Try a different search term</p> 
        </div>
      ) : ( 
        <>
          <MovieGrid movies={movies} /> 
          
  
          {currentPage < totalPages && ( 
            <div className="flex justify-center mt-8"> 
              <button  
                onClick={handleLoadMore}  
                className="btn btn-primary" 
                disabled={loading} 
              >
                {loading ? 'Loading...' : 'Load More'} 
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;