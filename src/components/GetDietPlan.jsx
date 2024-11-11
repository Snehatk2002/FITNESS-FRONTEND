// src/components/FetchDietPlans.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const GetDietPlan = () => {
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [dietPlans, setDietPlans] = useState([]);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/dietPlan/${fitnessGoal}`);
      setDietPlans(response.data);
      setError('');
    } catch (err) {
      setError('No diet plans found for this fitness goal');
      setDietPlans([]);
    }
  };

  return (
    <div>
        <Navbar/>
    <br></br>
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Fetch Diet Plans</h2>
      <input
        type="text"
        value={fitnessGoal}
        onChange={(e) => setFitnessGoal(e.target.value)}
        placeholder="Enter fitness goal"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button
        onClick={handleFetch}
        style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        Fetch Diet Plans
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {dietPlans.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {dietPlans.map((plan, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>{plan.name}</h3>
              <p><strong>Description:</strong> {plan.description}</p>
              <p><strong>Fitness Goal:</strong> {plan.fitnessGoal}</p>
              <p><strong>Calorie Range:</strong> {plan.calorieRange.min} - {plan.calorieRange.max} kcal</p>
              <p><strong>Meals Per Day:</strong> {plan.mealFrequency}</p>
              <p><strong>Dietary Restrictions:</strong> {plan.dietaryRestrictions.join(', ')}</p>
              {plan.meals.map((meal, mealIndex) => (
                <div key={mealIndex}>
                  <p><strong>Meal Type:</strong> {meal.mealType}</p>
                  <ul>
                    {meal.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default GetDietPlan;
