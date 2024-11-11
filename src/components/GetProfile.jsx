import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is a shared component for navigation

const FetchProfile = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/login'); // Redirect to login if no email is found
    }
  }, [navigate]);

  const handleFetch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8080/profile/${email}`);
      setProfile(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Profile not found.');
      } else {
        setError('An error occurred while fetching the profile.');
      }
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <center><h2>User Profile</h2></center>
        {/* Logo Image */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="fit.png" alt="Logo" style={{ width: '300px', height: 'auto' }} />
        </div>
        
        {/* Centering Input and Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={{
              width: '80%',
              padding: '8px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            disabled // Disable input field to prevent changes
          />
          <button
            onClick={handleFetch}
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
            <img src={profile.profilePicture} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '10px' }} />
            <h3>{profile.name}</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Phone Number:</strong> {profile.phoneno}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Date of Birth:</strong> {profile.age}</p>
            <p><strong>Weight:</strong> {profile.weight}</p>
            <p><strong>Height:</strong> {profile.height}</p>
            <p><strong>Membership Type:</strong> {profile.membershipType}</p>
            <p><strong>Membership Start Date:</strong> {profile.membershipStartDate}</p>
            <p><strong>Fitness Goal:</strong> {profile.fitnessGoal}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchProfile;
