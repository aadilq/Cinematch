import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';
import { FaHeart } from 'react-icons/fa';



const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element = {<Home />}/> //Route for the home page
            <Route path="/search" element = {<SearchResults />} /> //Route for the Search Results pages
            <Route path="/movie/:id" element = {<MovieDetails />} /> //Route for the movie details
          </Routes>
        </main>
        <footer className="bg-secondary py-6">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p className="flex items-center justify-center gap-2">
              Made <FaHeart className="text-accent"/> For movie lovers
            </p>
            <p className="mt-2 text-sm">
              Powered by TMDB API 
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

