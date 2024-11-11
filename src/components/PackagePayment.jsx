import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const PackagePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { membershipType } = location.state || {};
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!membershipType) {
      // Redirect if membershipType is not present
      navigate('/signup'); // Redirect to signup or handle appropriately
    }
  }, [membershipType, navigate]);

  const qrDataGPay = `Payment for ${membershipType} membership via GPay`;
  const qrDataPhonePe = `Payment for ${membershipType} membership via PhonePe`;

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Thank you for your purchase.');
    // Pass membershipType to the signup page
    navigate('/signup', { state: { membershipType } });
  };

  return (
    <div style={{
      display: 'flex',          // Enable flexbox
      justifyContent: 'center', // Center horizontally
      alignItems: 'center',     // Center vertically
      minHeight: '100vh',       // Ensure it takes full viewport height
      backgroundColor: '#f0f0f0',
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Payment for {membershipType} Membership</h2>
        <p style={{ marginBottom: '30px', color: '#555' }}>Please select a payment method:</p>

        <div style={{ marginBottom: '30px' }}>
          <button 
            onClick={() => handlePaymentSelect('GPay')} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '15px',
              transition: 'background-color 0.3s ease',
              fontSize: '16px'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={e => e.target.style.backgroundColor = '#007bff'}
          >
            Pay with GPay
          </button>
          <button 
            onClick={() => handlePaymentSelect('PhonePe')} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              fontSize: '16px'
            }}
            onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={e => e.target.style.backgroundColor = '#007bff'}
          >
            Pay with PhonePe
          </button>
        </div>

        {selectedPayment && (
          <>
            <p style={{ marginBottom: '20px', color: '#555' }}>
              Please scan the QR code to complete your payment via {selectedPayment}.
            </p>
            <div style={{ marginBottom: '20px' }}>
              {selectedPayment === 'GPay' && (
                <>
                  <h3 style={{ marginBottom: '10px', color: '#007bff' }}>GPay</h3>
                  <QRCodeCanvas value={qrDataGPay} size={200} />
                </>
              )}
              {selectedPayment === 'PhonePe' && (
                <>
                  <h3 style={{ marginBottom: '10px', color: '#007bff' }}>PhonePe</h3>
                  <QRCodeCanvas value={qrDataPhonePe} size={200} />
                </>
              )}
            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <button onClick={handlePaymentSuccess} style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0 10px',
                transition: 'background-color 0.3s ease',
                fontSize: '16px'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#218838'}
              onMouseLeave={e => e.target.style.backgroundColor = '#28a745'}
              >
                Simulate {selectedPayment} Payment Success
              </button>
            </div>
          </>
        )}

        <div style={{ marginTop: '30px' }}>
          <button onClick={() => window.history.back()} style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#0056b3'}
          onMouseLeave={e => e.target.style.backgroundColor = '#007bff'}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackagePayment;
