import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is a shared component for navigation

const GetTrainerProfile = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('trainerEmail'); // Adjust the key as necessary
    if (storedEmail) {
      setEmail(storedEmail); // Autofill email from sessionStorage
      handleFetch(storedEmail); // Fetch profile automatically with the stored email
    } else {
      navigate('/gettrainerprofile'); // Redirect to login if no email is found
    }
  }, [navigate]);

  const handleFetch = async (emailToFetch) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8080/trainerProfile/${emailToFetch}`); // Adjust API endpoint as needed
      setProfile(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Trainer profile not found.');
      } else {
        setError('An error occurred while fetching the profile.');
      }
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBackClick = () => {
    navigate('/trainerpage'); // Navigate back to the Trainer Page
  };

  return (
    <div>
      <br />
      <div style={{
        maxWidth: '700px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent white background
        backdropFilter: 'blur(10px)', // Blur effect for background
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
      }}>
        <center><h2>Trainer Profile</h2></center>
        {/* Logo Image */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="fit.png" alt="Logo" style={{ width: '300px', height: 'auto' }} />
        </div>
        
        {/* Centering Input and Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
            style={{
              width: '80%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button
            onClick={() => handleFetch(email)} // Fetch profile on button click
            disabled={loading}
            style={{
              width: '40%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            {loading ? 'Loading...' : 'View Profile'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {profile && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3>{profile.name}</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone Number:</strong> {profile.phoneno}</p>
            <p><strong>Specialization:</strong> {profile.spec}</p>
            <p><strong>Experience:</strong> {profile.experience}</p>
            <p><strong>Certifications:</strong> {profile.certification}</p>
            <p><strong>Availability:</strong> {profile.aval}</p>
          </div>
        )}

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleBackClick}
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetTrainerProfile;
