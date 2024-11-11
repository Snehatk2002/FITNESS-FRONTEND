import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminGetProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userprofile');
        setProfiles(response.data);
      } catch (err) {
        setError('Error fetching profiles');
        console.error('Error fetching profiles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleDelete = async (email) => {
    if (window.confirm(`Are you sure you want to delete the profile with email ${email}?`)) {
      setMessage('');
      setDeletingEmail(email);
      try {
        const response = await axios.delete(`http://localhost:8080/profile/${email}`);
        setMessage(response.data.message);
        setProfiles(profiles.filter(profile => profile.email !== email));
      } catch (err) {
        setMessage('Error deleting profile');
        console.error('Error deleting profile:', err);
      } finally {
        setDeletingEmail(null);
      }
    }
  };

  const styles = {
    page: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
    },
    content: {
      padding: '20px',
    },
    profileList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    listItem: {
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '15px',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#e74c3c',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer',
      padding: '10px',
    },
    buttonHover: {
      backgroundColor: '#c0392b',
    },
    message: {
      color: '#e74c3c',
    },
    loading: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    profileImage: {
      width: '200px',
      height: '200px',
      borderRadius: '50%', // This makes the image circular
      objectFit: 'cover', // Ensures the image covers the entire circular frame
      marginBottom: '10px',
    },
  };

  if (loading) return <p style={styles.loading}>Loading profiles...</p>;
  if (error) return <p style={styles.message}>{error}</p>;

  return (
    <div style={styles.page}>
      <AdminNavbar />
      <div style={styles.content}>
        <center>
        <h1>Admin Profile Management</h1>
        </center>
        {message && <p style={styles.message}>{message}</p>}
        <div style={styles.profileList}>
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <div style={styles.listItem} key={profile._id}>
                <img src={profile.profilePicture} alt="Profile" style={styles.profileImage} />
                <h3>{profile.name}</h3>
                <p>Email: {profile.email}</p>
                <p>Phone Number: {profile.phoneno}</p>
                <p>Address: {profile.address}</p>
                <p>Gender: {profile.gender}</p>
                <p>Date of Birth: {profile.age}</p>
                <p>Weight: {profile.weight} kg</p>
                <p>Height: {profile.height} cm</p>
                <p>Membership: {profile.membershipType}</p>
                <p>Membership Start Date: {profile.membershipStartDate}</p>
                <p>Fitness Goal: {profile.fitnessGoal}</p>
                <button
                  onClick={() => handleDelete(profile.email)}
                  style={styles.button}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                  disabled={deletingEmail === profile.email}
                >
                  {deletingEmail === profile.email ? 'Deleting...' : 'Delete Profile'}
                </button>
              </div>
            ))
          ) : (
            <p>No profiles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGetProfile;
