import React, { useState } from 'react';
import './settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emails: true,
  });

  const handleSettingsChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to update settings
    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Settings updated successfully');
        } else {
          console.log('Error updating settings');
        }
      })
      .catch((error) => {
        console.log('Error updating settings');
      });
  };

  return (
    <div className='settings-container'>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Notifications:
          <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleSettingsChange} />
        </label>
        <label>
          Emails:
          <input type="checkbox" name="emails" checked={settings.emails} onChange={handleSettingsChange} />
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;