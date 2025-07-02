import React, { useEffect, useState } from 'react';
import './popular.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const  Popular = () => {
  const [movies, setMovies] = useState([]); 
  const [error, setError] = useState(null); 

  const popularmovie = async () => {
    try {
      const api_url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=6`;
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    popularmovie();
  }, []);

  return (
    <>
      <div className='popular_movie'>
        <h2>Popular Movies</h2>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div className='container'>
            <div className='content'> 
                <Swiper
                slidesPerView={5}
                spaceBetween={30}>
              {movies.map((movie) => (
                <SwiperSlide>
                <div className='box' key={movie.id}>
                    <div className='img_box'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <h3>{movie.title}</h3>
                </div>
                </SwiperSlide>
              ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default Popular;