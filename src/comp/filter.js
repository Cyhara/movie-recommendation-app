import React, { useState, useEffect } from 'react';
import './filter.css';


const FilterMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const api_url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=16`;
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="containers">
      <h2>Filter Movies</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by title"
          />
          <div className="img_box">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie_card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMovies;