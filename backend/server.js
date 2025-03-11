// Load environment variables from .env file
require('dotenv').configure(); //Loads .env file contents into process.env by default

const express = require('express'); //Express is the web server framework that we will be using
const cors = require('cors'); //cors will allow us to make requests from our frontend to backend
const axios = require('axios'); //axios will be used to make https request to the TMDB API


const app = express(); //Create a new express Application
const PORT = process.env.PORT || 5000


const TMDB_BASE_URL = 'https://api.themoviedb.org/3'; // The base URL for TMDB API v3
const TMDB_API_KEY = process.env.TMDB_API_KEY; //API key from .env file


app.use(cors());
app.use(express.json());

//API routes
//Get Popular Movies
app.get('/api/movies/popular', async (request, response) => {
    try{
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY, // Pass our API key
                language: 'en-us', //Set the language to English
                page: request.query.page || 1 //Get the page number from the query or just default it to one
            }
        })
        response.json(response.data) // Send the data from TMDB back to the client
    } catch(error){
        // If an error occurs, log it and send an error response
        console.log('Error fetching popular movies: ', error);
        response.status(500).json({error: 'Failed to fetch'});

    }
})

// Get movie details by ID
app.get('/api/movies/:id' , async (request, response) => {
    try{
        const movieID = request.params.id;

        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieID}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-us', 
                append_to_response: 'videos, credits'
            }
        })
        response.json(response.data)
    }
    catch(error){
        console.log(`Error fetching movie ${request.params.id}:`, error);
        response.status(500).json({error: `Failed to fetch movie ${req.params.id}`});
    }

})


//Get movie Recommendations
app.get('/api/movies/:id/recommendations', async (request, response) => {
    try{
        const movieID = request.params.id;

        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieID}/recommendations`, {
            params:{
                api_key : TMDB_API_KEY, 
                language : 'en-us', 
                page : request.query.page || 1
            }
        })
        response.json(response.data)
    }
    catch(error){
        console.error(`Error fetching recommendations for movie ${req.params.id}:`, error);
        res.status(500).json({ error: `Failed to fetch recommendations for movie ${req.params.id}` });

    }   
})

//Search for movies

app.get('/api/search/movies', async (request, response) => {
    try{
        const query = request.query.query;

        if(!query){
            return response.status(400).json({ error: 'Search query is required' }); //client failed to provide a required search query parameter
        }
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key : TMDB_API_KEY, 
                language : 'en-us', 
                query: query,
                page: req.query.page || 1 
            }
        })
        response.json(response.data)
    }
    catch(error){
        console.error('Error searching movies:', error);
        response.status(500).json({ error: 'Failed to search movies' });
    }
})

app.listen(PORT, ()=>{
    console.log(`port is listening on PORT${PORT}`); //We want to console.log that the server has started
})





