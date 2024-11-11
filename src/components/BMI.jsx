import React, { useState } from 'react';
import Navbar from './Navbar';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI.toFixed(2));

      if (calculatedBMI < 18.5) {
        setCategory('Underweight');
        setAdvice('Consider increasing your calorie intake and seeking advice from a healthcare provider.');
      } else if (calculatedBMI < 24.9) {
        setCategory('Normal weight');
        setAdvice('Maintain your healthy lifestyle and balanced diet.');
      } else if (calculatedBMI < 29.9) {
        setCategory('Overweight');
        setAdvice('Incorporate regular physical activity and a balanced diet to manage weight.');
      } else if (calculatedBMI < 34.9) {
        setCategory('Obesity Class I');
        setAdvice('It is recommended to consult with a healthcare provider for personalized advice.');
      } else if (calculatedBMI < 39.9) {
        setCategory('Obesity Class II');
        setAdvice('You may benefit from medical supervision to develop a weight loss plan.');
      } else {
        setCategory('Obesity Class III (Severe)');
        setAdvice('It is strongly advised to seek medical advice to address potential health risks.');
      }

      setError('');
    } else {
      setError('Please enter both weight and height');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2>BMI Calculator</h2>
          <div style={styles.formGroup}>
            <label htmlFor="weight">Weight (kg):</label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="height">Height (cm):</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={calculateBMI} style={styles.button}>
            Calculate
          </button>
          {error && <p style={styles.error}>{error}</p>}
          {bmi !== null && (
            <div style={styles.result}>
              <h3>BMI: {bmi}</h3>
              <p>Category: <strong>{category}</strong></p>
              <p>{advice}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
   
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
  },
  container: {
    padding: '20px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent white background
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  result: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#d1e7dd',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
  },
};

export default BMI;
