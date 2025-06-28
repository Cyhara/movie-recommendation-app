import React, { useState } from 'react';
import './changePassword.css'

const ChangePassword = () => {
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handlePasswordChange = (event) => {
    setPassword({ ...password, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Call API to change password
    fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccess('Password changed successfully');
        } else {
          setError('Error changing password');
        }
      })
      .catch((error) => {
        setError('Error changing password');
      });
  };

  return (
    <div className='change-password-container'>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input type="password" name="currentPassword" value={password.currentPassword} onChange={handlePasswordChange} />
        </label>
        <label>
          New Password:
          <input type="password" name="newPassword" value={password.newPassword} onChange={handlePasswordChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" value={password.confirmPassword} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Change Password</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;