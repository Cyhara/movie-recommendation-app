import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home.js';
import Movie from './movie.js';
import TvShows from './TvShow.js';
import About from './about.js';
import Contact from './contact.js';
import FilterMovies from './filter.js';
import FavoriteMovies from './favorite.js';
import ChangePassword from './changePassword.js';
import Settings from './settings.js';
import Profile from './profile.js';


const Rout = ({detail, detailData, close, detailClose, showDetail}) => {
  return (
    <Routes>
      <Route path="/" element={<Home detail={detail} detailData={detailData} close={close} detailClose={detailClose} showDetail={showDetail}/>} />
      <Route path='/movie' element={<Movie />} />
      <Route path="/tv_shows" element={<TvShows />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/filter_movies" element={<FilterMovies />} />
      <Route path="/favorite_movies" element={<FavoriteMovies />} />
      <Route path="/change_password" element={<ChangePassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
};

export default Rout;