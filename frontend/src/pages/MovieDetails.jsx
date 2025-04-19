// src/pages/MovieDetails.jsx
import React, { useState, useEffect } from 'react'; 
import { useParams, Link } from 'react-router-dom'; 
import { FaStar, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa'; 
import LoadingSpinner from '../components/layout/LoadingSpinner'; 
import MovieGrid from '../components/movies/MovieGrid'; 
import { movieService } from '../services/api'; 

const MovieDetails = () => { 
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => { 
  
    const fetchMovieData = async () => { 
      try {
        setLoading(true);
        

        const movieData = await movieService.getMovieDetails(id); 
        setMovie(movieData); 
        
        // Fetch recommendations
        const recommendationsData = await movieService.getRecommendations(id); 
        setRecommendations(recommendationsData.results); 
        
        setError(null); 
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie details. Please try again later.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchMovieData(); 
  }, [id]); 

  if (loading) return <LoadingSpinner />; 
  if (error) return <div className="container mx-auto px-4 py-10 text-center text-red-500">{error}</div>;
  if (!movie) return <div className="container mx-auto px-4 py-10 text-center">Movie not found</div>;

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => { 
    const hours = Math.floor(minutes / 60); 
    const mins = minutes % 60; 
    return `${hours}h ${mins}m`; 
  };

  const imageBaseUrl = 'https://image.tmdb.org/t/p/original'; 

  return ( 
    <div className="min-h-screen">
      {/* Movie backdrop header */}
      <div className="relative"> 
        {movie.backdrop_path ? ( 
          <div className="w-full h-[50vh] overflow-hidden relative"> 
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div> 
            <img
              src={`${imageBaseUrl}${movie.backdrop_path}`} 
              alt={`${movie.title} backdrop`}
              className="w-full h-full object-cover" 
            />
          </div>
        ) : ( 
          <div className="w-full h-32 bg-gradient-to-r from-secondary to-primary-dark"></div> 
        )}
      </div>

    
      <div className="container mx-auto px-4 -mt-36 relative z-20"> 
        <div className="flex flex-col md:flex-row gap-8"> 
         
          <div className="w-full md:w-1/3 lg:w-1/4"> 
            {movie.poster_path ? ( 
              <img
                src={`${imageBaseUrl}/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full rounded-lg shadow-2xl" 
              />
            ) : ( 
              <div className="bg-gray-800 rounded-lg aspect-[2/3] flex items-center justify-center"> 
                <span className="text-gray-400">No poster available</span> 
              </div>
            )}
          </div>

          
          <div className="w-full md:w-2/3 lg:w-3/4"> 
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1> 
            
            {movie.tagline && ( 
              <p className="text-gray-400 text-lg italic mb-4">{movie.tagline}</p> 
            )}
            
  
            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6"> 
              {movie.release_date && ( 
                <div className="flex items-center"> 
                  <FaCalendarAlt className="mr-2 text-gray-400" /> 
                  {new Date(movie.release_date).getFullYear()} 
                </div>
              )}
              
              {movie.runtime > 0 && ( 
                <div className="flex items-center"> 
                  <FaClock className="mr-2 text-gray-400" />
                  {formatRuntime(movie.runtime)} 
                </div>
              )}
              
              {movie.vote_average > 0 && ( 
                <div className="flex items-center"> 
                  <FaStar className="mr-2 text-yellow-400" /> 
                  {movie.vote_average.toFixed(1)} 
                </div>
              )}
            </div>
            
      
            {movie.genres && movie.genres.length > 0 && ( 
              <div className="mb-6"> 
                <div className="flex items-center gap-2 mb-2"> 
                  <FaTag className="text-gray-400" /> 
                  <span className="font-medium">Genres:</span> 
                </div>
                <div className="flex flex-wrap gap-2"> 
                  {movie.genres.map(genre => ( 
                    <span  
                      key={genre.id}  
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm" 
                    >
                      {genre.name} 
                    </span>
                  ))}
                </div>
              </div>
            )}
            

            <div className="mb-6"> 
              <h2 className="text-xl font-semibold mb-2">Overview</h2> 
              <p className="text-gray-300 leading-relaxed"> 
                {movie.overview || 'No overview available.'} 
              </p>
            </div>
          </div>
        </div>
      </div>


      {recommendations.length > 0 && ( 
        <div className="py-12"> // Add vertical padding
          <MovieGrid  
            movies={recommendations}  
            title="You Might Also Like" 
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails; 