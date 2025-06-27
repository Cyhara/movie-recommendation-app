import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'; // Assuming you have a CSS file for styling
import { FiLogIn, FiLogOut } from 'react-icons/fi'; // Importing the login icon from react-icons
import { BiUserCircle } from 'react-icons/bi'; // Importing the user icon from react-icons
import { useAuth0 } from "@auth0/auth0-react";  


const Nav = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <>
    <div className='header_container'>
        <div className='contant'>
            <div className='logo'>
                <img src='img/logo1.jpg' alt='logo'></img>
            </div>
            <ul>
                <li><Link to='/' className='link'>Home</Link></li>
                <li><Link to='/movie' className='link'>Movie</Link></li>
                <li><Link to='/tv_shows' className='link'>Tv Shows</Link></li>
                <li><Link to='/favorite_movies' className='link'>Favorite Movies</Link></li>
                <li><Link to='/filter_movies' className='link'>Filter Movies</Link></li>
                <li><Link to='/contact' className='link'>Contact</Link></li>
                <li><Link to='/about' className='link'>About</Link></li>
            </ul>
            <div className='auth'>
                {
                    isAuthenticated ?
                    <div className='logout'>
                    <div className='logout_logo'>
                        <FiLogOut /> 
                    </div>
                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>Logout</button>
                </div> :
                <div className='login'>
                    <div className='login_logo'>
                        <FiLogIn /> 
                    </div>
                    <button onClick={() => loginWithRedirect()}>Login</button>
                </div>
                }    
            </div>
            {
                isAuthenticated && (
                  <div className='user'>
                <div className='user_name_logo'>
                <BiUserCircle />
            </div>  
                <div className='user_details'>
                    <p>Hello, { user.name }</p>
                </div>  
                </div>
                )
            }  
        </div>
    </div>
    </>
  )
}

export default Nav