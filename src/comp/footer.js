import React from 'react'
import './footer.css'
import { FaFacebookF, FaInstagram, FaSkype, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='container'>
      <div className='contant'>
        <div className='vidstream'>
          <div className='logo'>
            <img src='./img/logo1.jpg' alt='logo'></img>
          </div>
          <p>MovieCircle: where movie magic meets heart</p>
          <div className='icon'>
            <i><FaFacebookF /></i>
            <i><FaSkype /></i>
            <i><FaYoutube /></i>
            <i><FaInstagram /></i>
          </div>
        </div>
        <div className='quick_link'>
          <h3>Quick link</h3>
          <li><Link className='link'>About</Link></li>
          <li><Link className='link'>Privacy</Link></li>
          <li><Link className='link'>Terms and conditions</Link></li>
          <li><Link className='link'>Movie</Link></li>
          <li><Link className='link'>Home</Link></li>
        </div>
        <div className='subscribe'>
          <h3>Subscribe</h3>
          <p>Subscribe to our Newsletter</p>
          <input type='email' placeholder='Enter Your E-mail'></input>
          <button type='submit'>Submit</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer