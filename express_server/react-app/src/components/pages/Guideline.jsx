import React, { useState } from 'react';
import axios from 'axios';
import './nutrition-calculator.css'; // Ensure this CSS contains appropriate styling

const KidsNutritionCalculator = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [caloriesNeeded, setCaloriesNeeded] = useState(0);
  const [foodQuery, setFoodQuery] = useState('Last night we ordered a 14oz prime rib and mashed potatoes.');
  const [nutritionData, setNutritionData] = useState([]);


  const fetchNutritionDetails = () => {
    axios.get('https://api.calorieninjas.com/v1/nutrition', {
      params: { query: foodQuery },
      headers: { 'X-Api-Key': 'rkVD/Pr21pqRSrgBoHtT3w==H7PUAkImdNhM3JAJ' } 
    })
    .then(response => {
      setNutritionData(response.data.items);
    })
    .catch(error => {
      console.error('Error fetching nutrition data:', error);
    });
  };

  // Function to calculate total of each nutrient
  const getTotal = (nutrient) => {
    return nutritionData.reduce((acc, item) => acc + parseFloat(item[nutrient]), 0).toFixed(2);
  };

  // Nutrient labels and their keys in the data
  const nutrients = [
    { key: 'calories', label: 'Calories' },
    { key: 'fat_total_g', label: 'Fat Total (g)' },
    { key: 'fat_saturated_g', label: 'Fat Saturated (g)' },
    { key: 'cholesterol_mg', label: 'Cholesterol (mg)' },
    { key: 'sodium_mg', label: 'Sodium (mg)' },
    { key: 'carbohydrates_total_g', label: 'Carbohydrates (total g)' },
    { key: 'fiber_g', label: 'Fiber (g)' },
    { key: 'sugar_g', label: 'Sugar (g)' },
    { key: 'protein_g', label: 'Protein (g)' }
  ];

  const calculateCaloriesNeeded = () => {
    if (weight && height && age) {
      const baseCalories = 10 * weight + 6.25 * height - 5 * age;
      let adjustedCalories = baseCalories;
      switch (activityLevel) {
        case 'sedentary':
          adjustedCalories *= 1.2;
          break;
        case 'lightlyActive':
          adjustedCalories *= 1.375;
          break;
        case 'moderatelyActive':
          adjustedCalories *= 1.55;
          break;
        case 'veryActive':
          adjustedCalories *= 1.725;
          break;
        case 'extraActive':
          adjustedCalories *= 1.9;
          break;
      }
      setCaloriesNeeded(adjustedCalories);
    }
  };

  return (
    <div className="nutri-calc-container">
      <h2> Nutrition Calculator</h2>
      <div className="nutri-calc-input-container">
        <label>Age (years):</label>
        <input className="nutri-calc-input" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="nutri-calc-input-container">
        <label>Height (cm):</label>
        <input className="nutri-calc-input" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
      </div>
      <div className="nutri-calc-input-container">
        <label>Weight (kg):</label>
        <input className="nutri-calc-input" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div className="nutri-calc-input-container">
        <label>Activity Level:</label>
        <select className="nutri-calc-input" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="">Select Activity Level</option>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="lightlyActive">Lightly active (exercise 1-3 days/week)</option>
          <option value="moderatelyActive">Moderately active (exercise 3-5 days/week)</option>
          <option value="veryActive">Very active (exercise 6-7 days/week)</option>
          <option value="extraActive">Extra active (very hard exercise, physical job, or training twice a day)</option>
        </select>
      </div>
      <button className="nutri-calc-button" onClick={calculateCaloriesNeeded} disabled={!age || !height || !weight || !activityLevel}>
        Calculate Calories
      </button>
      {caloriesNeeded > 0 && (
        <div className="nutri-calc-result">
          <strong>Calories Needed Per Day:</strong> <span className="calories-value">{caloriesNeeded.toFixed(2)}</span>
          <div className="nutri-calc-input-container">
            <label>Food Query:</label>
            <p>
                Enter food or drink items with optional quantities. Default is 100 grams per item if not specified. Limit: 1500 characters.
                <br/>
                <br/>
                Example:
                Input: "2 apples, 100g chicken, 1 soda".

                Returns detailed nutrition information based on specified or default quantities.            
            </p>
            <input className="nutri-calc-input" type="text" value={foodQuery} onChange={(e) => setFoodQuery(e.target.value)} />
            <button className="nutri-calc-button" onClick={fetchNutritionDetails}>Get Nutrition Details</button>
          </div>
        </div>
      )}
      {/* Displaying nutrition information fetched */}
      {nutritionData.length > 0 && (
        <div className="nutrition-info">
          <h4>Nutrition Details</h4>
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                {nutritionData.map((item, index) => <th key={index}>{item.name}</th>)}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {nutrients.map((nutrient, index) => (
                <tr key={index}>
                  <td>{nutrient.label}</td>
                  {nutritionData.map((item, idx) => (
                    <td key={idx}>{item[nutrient.key]}</td>
                  ))}
                  <td>{getTotal(nutrient.key)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
  );
};

const NutritionCal = () => (
  <div className="pt-40 bg-gradient-to-r from-cyan-300 to-blue-900">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <h1 className="my-4 text-5xl font-bold leading-tight">
            Nutrition Calculator
        </h1>
        <p className="leading-normal text-2xl mb-8">
          Assessing your nutritional needs is a crucial step in maintaining a healthy lifestyle. 
          This calculator helps determine the daily caloric intake needed based on your child's age, height, weight, and activity level.
          <br /><br />
          Regular monitoring of nutritional intake can help in maintaining optimal health and preventing dietary-related health issues.
        </p>
      </div>
      <div className="w-full md:w-3/5 py-6 text-center">
        <KidsNutritionCalculator />
      </div>
    </div>
  </div>
);

export default NutritionCal;

