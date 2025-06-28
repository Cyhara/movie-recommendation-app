import React, { useState, useEffect } from 'react';
import './profile.css'

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    // Call API to get user profile
    fetch('/api/profile')
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.log('Error getting user profile');
      });
  }, []);

  const handleProfileChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to update user profile
    fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Profile updated successfully');
        } else {
          console.log('Error updating profile');
        }
      })
      .catch((error) => {
        console.log('Error updating profile');
      });
  };

  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleProfileChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleProfileChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;