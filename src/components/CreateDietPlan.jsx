// src/components/CreateDietPlan.js
import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const CreateDietPlan = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fitnessGoal: '',
    calorieRange: { min: '', max: '' },
    mealFrequency: 3,
    dietaryRestrictions: [],
    meals: [{ mealType: '', items: [''] }]
  });

  const [message, setMessage] = useState('');

  const handleChange = (e, index, itemIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };

    if (name === 'mealType') {
      updatedFormData.meals[index].mealType = value;
    } else if (name === 'item') {
      updatedFormData.meals[index].items[itemIndex] = value;
    } else if (name.startsWith('calorieRange')) {
      updatedFormData.calorieRange[name.split('.')[1]] = value;
    } else if (name === 'mealFrequency') {
      updatedFormData[name] = Number(value);
    } else if (name === 'dietaryRestrictions') {
      if (e.target.checked) {
        updatedFormData.dietaryRestrictions.push(value);
      } else {
        updatedFormData.dietaryRestrictions = updatedFormData.dietaryRestrictions.filter(item => item !== value);
      }
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const addMeal = () => {
    setFormData({
      ...formData,
      meals: [...formData.meals, { mealType: '', items: [''] }]
    });
  };

  const addItem = (index) => {
    const updatedMeals = [...formData.meals];
    updatedMeals[index].items.push('');
    setFormData({ ...formData, meals: updatedMeals });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/dietPlan', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error creating diet plan');
    }
  };

  return (
    <div>
        <AdminNavbar/>
    
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create Diet Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Diet Plan Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          name="fitnessGoal"
          placeholder="Fitness Goal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="calorieRange.min"
          placeholder="Min Calories"
          value={formData.calorieRange.min}
          onChange={handleChange}
          style={{ width: '48%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="number"
          name="calorieRange.max"
          placeholder="Max Calories"
          value={formData.calorieRange.max}
          onChange={handleChange}
          style={{ width: '48%', padding: '8px', marginBottom: '10px', marginLeft: '4%' }}
        />
        <input
          type="number"
          name="mealFrequency"
          placeholder="Meals Per Day"
          value={formData.mealFrequency}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <div style={{ marginBottom: '10px' }}>
          <label><input type="checkbox" name="dietaryRestrictions" value="Gluten-Free" onChange={handleChange} /> Gluten-Free</label>
          <label><input type="checkbox" name="dietaryRestrictions" value="Vegetarian" onChange={handleChange} /> Vegetarian</label>
          <label><input type="checkbox" name="dietaryRestrictions" value="Vegan" onChange={handleChange} /> Vegan</label>
          <label><input type="checkbox" name="dietaryRestrictions" value="Dairy-Free" onChange={handleChange} /> Dairy-Free</label>
        </div>
        {formData.meals.map((meal, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="mealType"
              placeholder="Meal Type"
              value={meal.mealType}
              onChange={(e) => handleChange(e, index)}
              style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
            />
            {meal.items.map((item, itemIndex) => (
              <input
                key={itemIndex}
                type="text"
                name="item"
                placeholder="Item"
                value={item}
                onChange={(e) => handleChange(e, index, itemIndex)}
                style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
              />
            ))}
            <button type="button" onClick={() => addItem(index)} style={{ marginBottom: '10px' }}>
              Add Item
            </button>
          </div>
        ))}
        <button type="button" onClick={addMeal} style={{ marginBottom: '10px' }}>
          Add Meal
        </button>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Create Diet Plan
        </button>
        {message && <p>{message}</p>}
      </form>
      <br></br>
      <div className="d-flex justify-content-end mb-4">
                                    <a href="/admindietplan" className="btn btn-primary">VIEW DIET</a>
                                </div>
    </div>
    </div>
  );
};

export default CreateDietPlan;
