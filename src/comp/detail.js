import React from 'react'
import './detail.css'
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Detail = ({detailData, close, detailClose}) => {
  return (
    <>
    {
      detailClose ? 
      <div className='detail_page'>
          <div className='close' onClick={close}>
            <AiOutlineClose />
          </div>
            <div className='container'>
                <div className='img_box'>
                    <img src={`https://image.tmdb.org/t/p/original${detailData.poster_path}`} alt=''></img>
                </div>
                <div className='info'>
                  <h2>{detailData.original_title}</h2>
                  <p>{}detailData.overview</p>
                  <p>Release:- {detailData.release_date}</p>
                  <p>Vote:- {detailData.vote_count}</p>
                  <div className='play'>
                    <Link to='#' className='link'><BsFillPlayFill />Play Now</Link>
                  </div>
                </div>
            </div>
        </div>
      :
      null
    }
    
    </>
  )
}

export default Detail