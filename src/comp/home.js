import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsFillPlayFill } from "react-icons/bs";
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiFillStar, AiOutlineFileText } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Detail from './detail.js';
import './home.css'
import 'swiper/css';

const Home = ({detail, detailData, close, detailClose, showDetail}) => {
    const [trendingData, setTrendingData] = useState([]);
    const [horrorData, setHorrorData] = useState([]);
    const [trendingDetail, setTrendingDetail] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=trending.desc&with_origin_country=KR&with_genres=28`);
                const data = await response.json();
                setTrendingData(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchHorrorMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`);
                const data = await response.json();
                setHorrorData(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTrendingMovies();
        fetchHorrorMovies();
    }, [apiKey]);

    const trendingmoviedetail = (detail) => {
        setTrendingDetail(detail)
    }

    const detaillength = (trendingDetail || []).length === 0

    return (
        <>
            {
                showDetail ? 
                <Detail detailData={detailData} close={close} detailClose={detailClose}/>
                :
                null
            }
            <div className='main_container' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/banner6.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='contant'>
                    <div className='detail'>
                        <div className='container'>
                            <h2>Tale of the Nine Tailed 1938</h2>
                            <p>A K-fantasy action unfolds as the Nine-tailed fox makes a crash landing in the year 1938, an era of chaos, and he struggles to return to the present.</p>
                            <div className='btn'>
                                <Link to='/' className='play'><BsFillPlayFill />Play Now</Link>
                                <Link to='/' className='movie_detail'><HiOutlineDocumentText />Detail</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='horrormovie'>
                <h2>Horror Movie</h2>
                <div className='container'>
                    <div className='contant'>
                    {
                        horrorData && horrorData.length > 0 && horrorData.map((curElm) => {
                            return (
                                <div className='box' key={curElm.id}>
                                    <div className='img_box'>
                                        <img src={`https://image.tmdb.org/t/p/original${curElm.poster_path}`} alt=''></img>
                                    </div>
                                    <div className='detail'>
                                        <div className='movie_detail'>
                                            <h3>{curElm.original_title}</h3>
                                            <p>Release Date:- {curElm.release_date}</p>
                                            <p>language:- {curElm.original_language}</p>
                                        </div>
                                        <div className='rate'>
                                            <div className='icon'>
                                                <AiFillStar />
                                            </div>
                                            <div className='rate_count'>
                                                <p>{curElm.vote_average}</p>
                                            </div>
                                        </div>
                                        <div className='icons'>
                                            <div className='play'>
                                                <BsFillPlayFill />
                                            </div>
                                            <div className='moviedetail' onClick={() => detail (curElm)}>
                                                <AiOutlineFileText />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            <div className='trending'>
                <h2>Trending Movies</h2>
                <div className='movie_list'>
                    <div className='contant'>
                        <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        className="mySwiper"
                        >
                           {
                            trendingData && trendingData.length > 0 && trendingData.map((curElm) => {
                                return(
                                    <>
                                    <SwiperSlide key={curElm.id}>
                                        <div className='box' onClick={() => trendingmoviedetail(curElm)}>
                                            <div className='img_box'>
                                                <img src={`https://image.tmdb.org/t/p/original${curElm.poster_path}`} alt=''></img>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    
                                    </>
                                )
                            })
                        } 
                        </Swiper> 
                    </div>
                </div>
            </div>
            {
                detaillength ?
                <div className='trending_detail'>
                <div className='container'>
                    <div className='contant'>
                        <div className='logo'>
                            <img src='img/logo1.jpg' alt='logo'></img>
                        </div>
                        <div className='title'>
                            <h2>{[]}</h2>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='trending_detail'>
                <div className='container'>
                    <div className='contant'>
                        <div className='logo'>
                            <img src='img/logo1.jpg' alt='logo'></img>
                        </div>
                        <div className='title'>
                            <h2>{trendingDetail.original_title}</h2>
                        </div>
                        <div className='detail'>
                            <p>{trendingDetail.overview}</p>
                        </div>
                        <div className='rate'>
                            <div className='icon'>
                                <AiFillStar />
                            </div>
                            <div className='rate_count'>
                                <p>{trendingDetail.vote_average}</p>
                            </div>
                        </div>
                        <div className='lang'>
                            <p>Language:- {trendingDetail.original_language}</p>
                        </div>
                        <div className='release_date'>
                            <p>Release:- {trendingDetail.release_date}</p>
                        </div>
                        <div className='vote'>
                            <p>vote:- {trendingDetail.vote_count}</p>
                        </div>
                        <div className='btn'>
                            <Link to='/' className='play'><BsFillPlayFill />Play Now</Link>
                            <Link to='/' className='movie_detail'><HiOutlineDocumentText />Detail</Link>
                        </div>
                    </div>
                    <div className='img_box'>
                        <img src={`https://image.tmdb.org/t/p/original${trendingDetail.poster_path}`} alt=''></img>
                    </div>
                    
                </div>
            </div>
            }  
        </>
    );
};

export default Home;