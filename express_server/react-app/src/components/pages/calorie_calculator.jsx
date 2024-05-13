import React, { useState } from 'react';
import { message } from 'antd'; // Use the message component from Ant Design for alerts
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

  const handleAgeChange = (e) => {
    const newAge = Number(e.target.value);
    if (newAge > 100) {
      message.warning('Age cannot exceed 100 year old');
    } else {
      setAge(newAge);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = Number(e.target.value);
    if (newHeight > 250) {
      message.warning('Height cannot exceed 250 cm');
    } else {
      setHeight(newHeight);
    }
  };

  const handleWeightChange = (e) => {
    const newWeight = Number(e.target.value);
    if (newWeight > 300) {
      message.warning('Weight cannot exceed 300 kg');
    } else {
      setWeight(newWeight);
    }
  };

  return (
    <div className="nutrition-component">
      <div className="nutri-calc-container">
        <label>Calorie Calculator</label>
        <div className="nutri-calc-input-container">
          <label>Age (years):</label>
          <input type="number" value={age} onChange={handleAgeChange} />
        </div>
        <div className="nutri-calc-input-container">
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={handleHeightChange} />
        </div>
        <div className="nutri-calc-input-container">
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={handleWeightChange} />
        </div>
        <div className="nutri-calc-input-container">
          <label>Activity Level:</label>
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary</option>
            <option value="lightlyActive">Lightly active</option>
            <option value="moderatelyActive">Moderately active</option>
            <option value="veryActive">Very active</option>
            <option value="extraActive">Extra active</option>
          </select>
        </div>
        <button onClick={calculateCaloriesNeeded} disabled={!age || !height || !weight || !activityLevel}>
          Calculate Calories
        </button>
        {caloriesNeeded > 0 && (
          <div className="nutri-calc-result">
            <strong>Calories Needed Per Day:</strong> <span>{caloriesNeeded.toFixed(2)}</span>
          </div>
        )}
      </div>
      <br/>      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="nutri-calc-container">
        <div className="nutri-calc-input-container">
        <label>Food Query:</label>
          <p>
            Enter food or drink items with optional quantities. Default is 100 grams per item if not specified. Limit: 1500 characters.
            <br/><br/>
            Example: Input: "2 apples, 100g chicken, 1 soda".
            Returns detailed nutrition information based on specified or default quantities.
          </p>
          <input className="nutri-calc-input" type="text" value={foodQuery} onChange={setFoodQuery} />
          <button className="nutri-calc-button" onClick={fetchNutritionDetails}>Get Nutrition Details</button>
        </div>
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
            </div>
          );
        };

const NutritionCal = () => (
  <div className="pt-40 bg-gradient-to-r from-cyan-300 to-blue-900">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/* Calorie Calculator Section */}
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <h1 className="my-4 text-5xl font-bold leading-tight">
          Calorie Calculator
        </h1>
        <p className="leading-normal text-2xl mb-8">
          Discover how many calories are needed daily for yourself or your child. This calculator takes into consideration age, height, weight, and activity level to provide an accurate caloric intake suggestion. Properly managing daily calorie needs is key to maintaining good health and supporting growth in children.
          <br /><br />
          Use this tool to aid in creating nutritionally balanced meal plans for both adults and children.
        </p>
        <p className="text-xl italic mt-4">
          Note: Please determine your daily calorie needs using the Calorie Calculator before entering food details to assess nutritional information.
        </p>
      {/* Nutrition Details Calculator Section */}
        <h1 className="my-4 text-5xl font-bold leading-tight">
          Nutrition Details
        </h1>
        <p className="leading-normal text-2xl mb-8">
          Focus on the broader nutritional needs beyond just calorie counts. Enter specific foods to see detailed nutritional information, including proteins, minerals, and macronutrient breakdown, for adults or children. This detailed analysis helps ensure a balanced diet, which is crucial for optimal health and development at any age.
          <br /><br />
          Regularly tracking these details supports maintaining a balanced diet necessary for overall well-being.
        </p>
      </div>
      {/* Calculator Display Section */}
      <div className="w-full md:w-3/5 py-6 text-center">
        <KidsNutritionCalculator />
      </div>
    </div>
  </div>
);

export default NutritionCal;

