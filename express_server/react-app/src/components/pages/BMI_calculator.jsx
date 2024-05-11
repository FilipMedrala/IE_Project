import React, { useState } from 'react';
import { Button, message } from 'antd'; // Use the message component from Ant Design for alerts
import './information.css'; // Import CSS file for styling
import './bmi.css';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiValue, setBMIValue] = useState(null);
    const [bmiCategory, setBMICategory] = useState('');
    const [activityRecommendation, setActivityRecommendation] = useState('');

    const calculateBMI = () => {
      if (height && weight) {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBMIValue(bmi);

        let category = '';
        let recommendation = '';
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
        setBMICategory(category);
        setActivityRecommendation(recommendation);
      } else {
        setBMIValue('');
        setBMICategory('');
        setActivityRecommendation('');
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


const BMICal = () => (
    <div className="pt-40 bg-gradient-to-r from-cyan-300 to-blue-900" >
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                <h1 className="my-4 text-5xl font-bold leading-tight">
                BMI Calculator
                </h1>
                <p className="leading-normal text-2xl mb-8">

                Assessing your health status is a very important step in understanding your overall well-being.
                By calculating your Body Mass Index (BMI), you can gain valuable insights into whether your weight falls within a healthy range for your height.
                <br />
                <br />
                Regularly monitoring your child's BMI can serve as a proactive measure in maintaining optimal health and preventing potential health complications associated with weight-related issues.
                </p>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
                <BMICalculator />
            </div>
        </div>
    </div>

);

export default BMICal;