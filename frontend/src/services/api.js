import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
      },
});

//movie-related API functions

export const movieService = {
    getPopular : async(page = 1) =>{
        try{
            const response = await api.get(`/movies/popular?page=${page}`);
            return response.data;
        }
        catch(error){
            console.log('Error fetching popular movies: ', error);
            throw error;
        }
    },

    getMovieDetails: async(movieID) =>{
        try{
            const response = await api.get(`/movie/${movieID}`);
            return response.data;
        }
        catch(error){
            console.log(`Error fetching movies ${movieID}: `, error);
            throw error;

        }
    }, 

    getRecommendations: async(movieID, page = 1) =>{
        try{
            const response = await api.get(`/movies/${movieID}/recommendations/?page=${page}`);
            return response.data;
        }
        catch(error){
            console.log(`Error fetching recommendations for ${movieID}: `, error);
            throw error;
        }
    }, 

    searchMovies: async (query, page = 1) => {
        try{
            const response = await api.get(`/search/movies?query=${encodeURIComponent(query)}&page=${page}`);
            return response.data;
        }
        catch(error){
            console.log(`Error searching movies:', error`);
            throw error;
        }
        
    }
}

export default api


