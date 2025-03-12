
import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaStar } from 'react-icons/fa'; 

const MovieCard = ({ movie }) => { 
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; 
  
  return (

    <Link to={`/movie/${movie.id}`} className="movie-card block">
 
      <div className="relative">

        {movie.poster_path ? (

          <img 
            src={`${imageBaseUrl}${movie.poster_path}`} 
            alt={movie.title} 
            className="w-full h-auto" 
            loading="lazy" 
          />
        ) : (

          <div className="bg-gray-700 w-full h-0 pb-[150%] flex items-center justify-center">
      
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        

        {movie.vote_average > 0 && (

          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 flex items-center space-x-1">

            <FaStar className="text-yellow-400 text-sm" />

            <span className="text-white text-sm font-medium">
              {movie.vote_average.toFixed(1)} 
            </span>
          </div>
        )}
      </div>
      

      <div className="p-4"> 

        <h3 className="font-semibold text-lg truncate">{movie.title}</h3>

        <p className="text-gray-400 text-sm">

          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown year'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;