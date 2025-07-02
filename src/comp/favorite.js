import React, { useState, useEffect } from 'react';
import './favorite.css';

const MyFavorite = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        const storedFavoriteIds = localStorage.getItem('favoriteIds');
        if (storedFavoriteIds) {
            setFavoriteIds(JSON.parse(storedFavoriteIds));
        }
    }, []);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                if (favoriteIds.length === 0) {
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        }
                    };
                    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&with_origin_country=IN`, options);
                    const data = await response.json();
                    setFavoriteMovies(data.results);
                } else {
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${apiKey}`
                        }
                    };
                    const promises = favoriteIds.map((id) => fetch(`https://api.themoviedb.org/3/movie/${id}`, options));
                    const responses = await Promise.all(promises);
                    const data = await Promise.all(responses.map((response) => response.json()));
                    setFavoriteMovies(data.filter(movie => movie !== null));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchFavoriteMovies();
    }, [favoriteIds, apiKey]);

    const handleRemoveFavorite = (movieId) => {
        const newFavoriteIds = favoriteIds.filter((id) => id !== movieId);
        setFavoriteIds(newFavoriteIds);
        localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));
        setFavoriteMovies(favoriteMovies.filter((movie) => movie.id !== movieId));
    };

    return (
        <div className="my-favorite">
            <h2>My Favorite Movies</h2>
            <div className="movie-list">
                {favoriteMovies.map((movie) => (
                    movie && 
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                        <div className="movie-info">
                            <h3>{movie.title}</h3>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                            <button onClick={() => handleRemoveFavorite(movie.id)}>Remove from Favorites</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorite;