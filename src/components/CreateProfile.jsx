// CreateProfile.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CreateProfile = () => {
  const [profile, setProfile] = useState({
    profilePicture: '',
    name: '',
    email: '',
    dateOfBirth: '',
    weight: '',
    height: '',
    membershipType: '',
    membershipStartDate: '',
    fitnessGoal: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    // Basic validation
    if (!profile.name || !profile.email || !profile.weight || !profile.height) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/createProfile', profile);
      setSuccess('Profile created successfully!');
      setProfile({ // Reset form
        profilePicture: '',
        name: '',
        email: '',
        dateOfBirth: '',
        weight: '',
        height: '',
        membershipType: '',
        membershipStartDate: '',
        fitnessGoal: ''
      });
    } catch (err) {
      setError('Error creating profile.');
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture URL"
            value={profile.profilePicture}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            value={profile.weight}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="height"
            placeholder="Height"
            value={profile.height}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            name="membershipType"
            value={profile.membershipType}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="" disabled>Select Membership Type</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          <input
            type="date"
            name="membershipStartDate"
            placeholder="Membership Start Date"
            value={profile.membershipStartDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            name="fitnessGoal"
            placeholder="Fitness Goal"
            value={profile.fitnessGoal}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            {loading ? 'Creating...' : 'Create Profile'}
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
