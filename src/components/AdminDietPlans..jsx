import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminDietPlans = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDietPlans = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/admindietPlans');
        setDietPlans(response.data);
      } catch (err) {
        setError('An error occurred while fetching diet plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchDietPlans();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.delete(`http://localhost:8080/dietPlan/name/${selectedName}`);
      alert(response.data.message);
      setDietPlans(dietPlans.filter(dietPlan => dietPlan.name !== selectedName));
      setSelectedName(''); // Clear selection
    } catch (err) {
      setError('An error occurred while deleting the diet plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-diet-plans">
      <AdminNavbar />
      <div className="container">
        <h2>Admin: Manage Diet Plans</h2>
        {error && <p className="error">{error}</p>}
        <div className="delete-section">
          <label>Select Diet Plan to Delete:</label>
          <select onChange={(e) => setSelectedName(e.target.value)} value={selectedName}>
            <option value="">--Select Diet Plan--</option>
            {dietPlans.map(dietPlan => (
              <option key={dietPlan._id} value={dietPlan.name}>{dietPlan.name}</option>
            ))}
          </select>
          <button onClick={handleDelete} disabled={loading || !selectedName}>
            {loading ? 'Deleting...' : 'Delete Diet Plan'}
          </button>
        </div>
        <div className="diet-plans-list">
          <h3>Available Diet Plans</h3>
          <ul>
            {dietPlans.map(dietPlan => (
              <li key={dietPlan._id} className="diet-plan-card">
                <h4>{dietPlan.name}</h4>
                <p><strong>Description:</strong> {dietPlan.description}</p>
                <p><strong>Fitness Goal:</strong> {dietPlan.fitnessGoal}</p>
                <p><strong>Calorie Range:</strong> {dietPlan.calorieRange.min} - {dietPlan.calorieRange.max} kcal/day</p>
                <p><strong>Meal Frequency:</strong> {dietPlan.mealFrequency} meals/day</p>
                <p><strong>Dietary Restrictions:</strong> {dietPlan.dietaryRestrictions.join(', ')}</p>
                <p><strong>Meals:</strong></p>
                <ul>
                  {dietPlan.meals.map((meal, index) => (
                    <li key={index}>
                      <strong>{meal.mealType}:</strong> {meal.items.join(', ')}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .admin-diet-plans {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h2 {
          text-align: center;
          color: #333;
        }
        .delete-section {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        select, button {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-right: 10px;
        }
        button {
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 20px;
        }
        .diet-plans-list {
          margin-top: 20px;
        }
        .diet-plan-card {
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
        }
        .diet-plan-card h4 {
          margin-top: 0;
          color: #333;
        }
        .diet-plan-card ul {
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default AdminDietPlans;
