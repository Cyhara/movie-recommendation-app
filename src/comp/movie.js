import React, { useState } from 'react';
import './movie.css';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { GrDocumentText } from 'react-icons/gr';
import TopMovie from './TopMovie';
import Popular from './popular';

const Movie = () => {
    const [search, setSearch] = useState('')
    const [searchMovie, setSearchMovie] = useState([])
    const searchlength = (search || []).length === 0
    const searchMovielength = (searchMovie || []).length === 0

    const moviesearch = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=2`;
        if(searchlength) {
            alert("Please Enter A Movie Name")
        }
        else {
            try{
                const movieapi = await fetch(url)
                const apijson = await movieapi.json()
                const movieresult = apijson['results']
                setSearchMovie(movieresult)
                console.log(movieresult)
            }
            catch {
                alert("Something went wrong")
            }
        }
    }

    return (
        <>
        <div className='movie_page'>
            <div className='movie_search'>
                <input type='text' placeholder='Enter any Movie Name' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <button type='submit' onClick={moviesearch}>Search</button>
            </div>
            <div className='topmovie'>
            <TopMovie />            
            </div>

            {
                searchMovielength ? 
                null
                :
                <>
                <div className='search_data'>
                <h2>From Your Search</h2>
                <div className='container'>
                    {
                        searchMovie.map((curElm) => {
                            return(
                                <>
                                <div key={curElm.id} className='box'>
                                    <div className='img_box'>
                                        {curElm.poster_path && (
                                            <img src={`https://image.tmdb.org/t/p/original/${curElm.poster_path}`} alt=''></img>
                                        )}
                                    </div>
                                    <div className='detail'>
                                        <h2>{curElm.original_title}</h2>
                                        <p>Release:- {curElm.release_date}</p>
                                        <p>Language:- {curElm.original_language}</p>
                                        <p>Vote:- {curElm.vote_count}</p>
                                        <div className='rate'>
                                            <div className='rate_icon'>
                                                <AiFillStar /> 
                                            </div>
                                            <div className='rate_count'>
                                                <p>{curElm.vote_average}</p>
                                            </div>
                                        </div>
                                        <div className='btn'>
                                            <div className='play'>
                                                <BsFillPlayFill />
                                            </div>
                                            <div className='movie_about'>
                                                <GrDocumentText />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
                </>
            }
            <div className='popular'>
                <Popular/>
            </div>
            
        </div>
        </>
    )
}

export default Movie