import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Package = () => {
  const navigate = useNavigate();
  const [selectedMembership, setSelectedMembership] = useState('Gold'); // Default selected membership

  const styles = {
    // Full-width banner styles
    banner: {
      backgroundColor: '#1E90FF',
      padding: 'px 0',
      textAlign: 'center',
      borderRadius: '4px',
      marginBottom: '40px',
      width: '90%', // Decreased width for the banner
      maxWidth: '1000px', // Max width for the banner
    },
    bannerText: {
      color: '#fff',
      fontSize: '3rem',
      fontWeight: 'bold',
      margin: '0',
    },
    // Page container styles
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '40px 20px',
      backgroundColor: '#f0f8ff', // Light background for the entire page
      minHeight: '100vh',
    },
    // Heading styles
    heading: {
      color: '#333',
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center',
    },
    // Search dropdown styles
    dropdown: {
      padding: '10px',
      fontSize: '1.2rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '40px',
      width: '200px',
    },
    dropdownLabel: {
      fontSize: '1.2rem',
      marginBottom: '10px',
      color: '#333',
    },
    // Card container for even spacing and centering
    cardContainer: {
      display: 'flex', // Change to flex for better alignment
      justifyContent: 'center', // Center items horizontally
      alignItems: 'center', // Center items vertically (if needed)
      flexDirection: 'column', // Stack cards vertically
      gap: '30px', // Space between cards
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto', // Center the container
    },
    // Individual card styles
    card: {
      height: '450px',
      maxWidth: '600px', // Use maxWidth instead of fixed width for responsiveness
      width: '100%', // Allow the card to take the full width up to maxWidth
      padding: '20px',
      borderRadius: '12px',
      textAlign: 'center',
      backgroundColor: '#007bff', // Blue background for the card
      color: '#fff', // White text color
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', // Slight shadow for depth
      display: 'flex',
      flexDirection: 'column', // Align content vertically
      justifyContent: 'space-between', // Space content evenly
    },
    // Button styles
    button: {
      padding: '8px 15px', // Shortened button size
      backgroundColor: '#ff9900', // Bright color for the button
      color: '#fff', // White text for the button
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '80%', // Shortened button width
      alignSelf: 'center', // Center the button horizontally
      marginTop: '10px', // Space above the button
    },
  };

  const commonBenefits = (membershipType) => (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <h4>Benefits:</h4>
      <ul style={{ listStyle: 'none', padding: '0', textAlign: 'center' }}>
        <li>
          Gym Access:{' '}
          {membershipType === 'Platinum'
            ? 'Unlimited (24/7)'
            : membershipType === 'Gold'
            ? 'Full Access'
            : 'Basic (Non-peak hours)'}
        </li>
        <li>
          Group Classes:{' '}
          {membershipType === 'Platinum'
            ? 'Unlimited (incl. premium)'
            : membershipType === 'Gold'
            ? 'Unlimited (some premium)'
            : 'Limited (no premium)'}
        </li>
        <li>
          Personal Trainer Sessions:{' '}
          {membershipType === 'Platinum'
            ? 'Priority booking, VIP trainers'
            : membershipType === 'Gold'
            ? '4 sessions/month'
            : '1 introductory session/month'}
        </li>
        <li>
          Locker Access:{' '}
          {membershipType === 'Platinum'
            ? 'Private, with towel service'
            : membershipType === 'Gold'
            ? 'Premium locker with towel'
            : 'Standard locker'}
        </li>
        <li>
          Health Assessments:{' '}
          {membershipType === 'Platinum'
            ? 'Monthly body composition'
            : membershipType === 'Gold'
            ? 'Monthly assessment'
            : 'Introductory assessment'}
        </li>
        <li>
          Wellness Facilities:{' '}
          {membershipType === 'Platinum'
            ? 'Full (incl. VIP areas)'
            : membershipType === 'Gold'
            ? 'Limited (e.g., 4 visits/month)'
            : 'No access'}
        </li>
        <li>
          Special Events/Perks:{' '}
          {membershipType === 'Platinum'
            ? 'Exclusive events, free merch'
            : membershipType === 'Gold'
            ? 'Access to some events'
            : 'Discounts on premium services'}
        </li>
      </ul>
    </div>
  );

  const handleSubscribe = (membershipType) => {
    navigate('/packagepayment', { state: { membershipType } });
  };

  return (
    <div style={styles.container}>
      {/* Banner Section */}
      <div style={styles.banner}>
        <h1 style={styles.bannerText}>ULTIMATE FIT ZONE</h1>
      </div>
      
      <h1 style={styles.heading}>Membership Plans</h1>
      {/* Dropdown for Membership Type Selection */}
      <label style={styles.dropdownLabel}>Select Membership Type to Subscribe:</label>
      <select
        style={styles.dropdown}
        value={selectedMembership}
        onChange={(e) => setSelectedMembership(e.target.value)}
      >
        <option value="Silver">Silver</option>
        <option value="Gold">Gold</option>
        <option value="Platinum">Platinum</option>
      </select>

      {/* Page Content */}
      <div style={styles.cardContainer}>
        {/* Render the selected membership type only */}
        {[selectedMembership].map((type, index) => (
          <div key={index} style={styles.card}>
            <h3>{`${type} Member`}</h3>
            <p>
              <strong>Price:</strong> ₹
              {type === 'Platinum'
                ? '5,000'
                : type === 'Gold'
                ? '3,500'
                : '2,000'}
              /month
            </p>
            <p>
              <strong>Annual Subscription:</strong> ₹
              {type === 'Platinum'
                ? '55,000'
                : type === 'Gold'
                ? '38,000'
                : '22,000'}{' '}
              (one month free)
            </p>
            {commonBenefits(type)}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                style={styles.button}
                onClick={() => handleSubscribe(type)}
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
