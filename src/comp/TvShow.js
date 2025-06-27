// TVShows.js
import React, { useState, useEffect } from 'react';
import './TvShow.css';

const TvShow = () => {
  const [tvShows, setTVShows] = useState([]);
  const [error, setError] = useState(null);

  const fetchTVShows = async () => {
    try {
      const api_url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTVShows(data.results);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching TV shows:', error);
    }
  };

  useEffect(() => {
    fetchTVShows();
  }, []);

  return (
    <div className="TVShows">
      <h2>Popular TV Shows</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="container">
          {tvShows.map((tvShow) => (
            <div key={tvShow.id} className="tvShow">
              <img
                src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
                alt={tvShow.name}
              />
              <h3>{tvShow.name}</h3>
              <p>Rating: {tvShow.vote_average}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TvShow;