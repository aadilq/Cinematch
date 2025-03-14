import React, { useState }from 'react';
import SearchBar from '../components/layout/Searchbar';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingSpinner from '../components/layout/LoadingSpinner';

import { movieService } from '../services/api';
import { FaFilm } from 'react-icons/fa';



const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]); 

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(()=> {
        // We want to Define async function to fetch popular movies from API
        const fetchPopularMovies =  async () => {
            try{
                setLoading(true);
                const data = await movieService.getPopular();

                setPopularMovies(data.results);
                setError(null);
            }
            catch(error){
                console.log('Error fetching popular movies:', error);
                setError('Failed to fetch popular movies. Please try again later.');
            }
            finally{
                setLoading(false);
            }
            
        };
        fetchPopularMovies();
    }, [])

  return (
    <div className='min-h-screen'>
        <section className='bg-gradient-to-r from-secondary to-primary-dark py-20 px-4'>
            <div className='container mx-auto text-center'>
                <div className='flex justify-center mb-4'>
                    <FaFilm className ='text-accent text-5xl' />
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home


