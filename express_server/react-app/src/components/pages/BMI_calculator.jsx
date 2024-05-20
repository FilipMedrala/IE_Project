import React, { useState } from 'react';
import { Button, message } from 'antd'; // Importing Button component from Ant Design and message component for alerts
import './information.css'; // Importing CSS file for styling
import './bmi.css'; // Importing BMI-specific CSS file for styling

// BMICalculator component
const BMICalculator = () => {
  // State variables for height, weight, BMI value, BMI category, and activity recommendation
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiValue, setBMIValue] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');
  const [activityRecommendation, setActivityRecommendation] = useState('');

  // Function to calculate BMI
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Calculating BMI
      setBMIValue(bmi);

      let category = '';
      let recommendation = '';
      // Determining BMI category and activity recommendation based on BMI value
      if (bmi < 18.5) {
        category = 'underweight';
        recommendation = 'Strength training exercises like weight lifting, and high-calorie nutritious meals.';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'normal';
        recommendation = 'A balanced mix of cardio, strength training, and flexibility exercises.';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'overweight';
        recommendation = 'Low-impact cardio such as swimming or cycling, combined with a healthy diet.';
      } else {
        category = 'obese';
        recommendation = 'Start with gentle activities like walking or water aerobics. Gradually increase intensity as comfort allows.';
      }
      // Setting BMI category and activity recommendation
      setBMICategory(category);
      setActivityRecommendation(recommendation);
    } else {
      // Resetting BMI value, category, and recommendation if height or weight is not provided
      setBMIValue('');
      setBMICategory('');
      setActivityRecommendation('');
    }
  };

  // Function to handle height input change
  const handleHeightChange = (e) => {
    const newHeight = Number(e.target.value);
    if (newHeight > 250) {
      // Displaying a warning message if height exceeds the limit
      message.warning('Height cannot exceed 250 cm');
    } else if (newHeight < 0) {
      // Displaying a warning message if a negative number is entered
      message.warning('Height cannot be negative');
      setHeight(''); // Resetting height to blank
    } else {
      setHeight(newHeight); // Updating height state
    }
  };
  
  // Function to handle weight input change
  const handleWeightChange = (e) => {
    const newWeight = Number(e.target.value);
    if (newWeight > 300) {
      // Displaying a warning message if weight exceeds the limit
      message.warning('Weight cannot exceed 300 kg');
    } else if (newWeight < 0) {
      // Displaying a warning message if a negative number is entered
      message.warning('Weight cannot be negative');
      setWeight(''); // Resetting weight to blank
    } else {
      setWeight(newWeight); // Updating weight state
    }
  };

  // Function to handle weight input change
 

  // Rendering BMI calculator UI
  return (
    <div className={`bmi-calculator-box ${bmiCategory}`}>
      <h2 className="sub-header" style={{ fontSize: "23px" }}>Calculate Your BMI</h2>
      <div className="input-container">
        <label htmlFor="height">Enter Your Height (cm):</label>
        <input
          type="number"
          placeholder="Enter your height (cm)"
          value={height}
          onChange={handleHeightChange}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="weight">Enter Your Weight (kg):</label>
        <input
          type="number"
          placeholder="Enter your weight (kg)"
          value={weight}
          onChange={handleWeightChange}
          className="input-field"
        />
      </div>
      <Button type="primary" onClick={calculateBMI} className="calculate-button">
        Calculate
      </Button>
      {bmiValue && (
        <div className="result_bmi">
          <p>
            Your BMI: <span className="bmi-value">{bmiValue}</span>
          </p>
          <p className="bmi-category">
            Result: You are <span className="bmi-message">{bmiCategory}</span> weight
          </p>
          <p className="bmi-activity">
            Recommended Activities: <span className="activity-message">{activityRecommendation}</span>
          </p>
        </div>
      )}
    </div>
  );
};

// BMICal component
const BMICal = () => (
  <div className="pt-40 bg-gradient-to-r from-cyan-300 to-blue-900">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <h1 className="my-4 text-5xl font-bold leading-tight">
          BMI Calculator
        </h1>
        <p className="leading-normal text-2xl mb-8">
          Assessing your health status is a very important step in understanding your overall well-being.
          By calculating your Body Mass Index (BMI), you can gain valuable insights into whether your weight falls within a healthy range for your height.
          <br /><br />
          Regularly monitoring your child's BMI can serve as a proactive measure in maintaining optimal health and preventing potential health complications associated with weight-related issues.
        </p>
        <p className="text-xl italic mt-4">
          Note: The BMI calculation may not be accurate for all individuals as it does not take into account muscle mass, bone density, overall body composition, and racial and ethnic differences. Always consult with a healthcare professional for a more comprehensive health assessment.
        </p>
      </div>
      <div className="w-full md:w-3/5 py-6 text-center">
        <BMICalculator /> {/* Rendering BMICalculator component */}
      </div>
    </div>
  </div>
);

export default BMICal; // Exporting BMICal component as default
