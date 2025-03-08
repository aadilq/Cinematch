// Load environment variables from .env file
require('dotenv').configure(); //Loads .env file contents into process.env by default

const express = require('express'); //Express is the web server framework that we will be using
const cors = require('cors'); //cors will allow us to make requests from our frontend to backend
const axios = require('axios'); //axios will be used to make https request to the TMDB API


const app = express(); //Create a new express Application
const PORT = process.env.PORT || 5000


app.use(cors());
app.use(express.json());






