import React, { useState } from 'react';
import { Statistic, Input, Button } from 'antd'; // Import Ant Design components
import { FaPerson } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan } from "react-icons/gi";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './StatisticsCards.css'; // Import CSS file for styling
import './bmi.css'
import map from "./assets/map.png";

import family from "./assets/family.jpg";
import game from "./assets/game.png";
import play from "./assets/play.png";


const data = [
  { name: 'Underweight', value: 8.2 },
  { name: 'Normal weight', value: 66.9 },
  { name: 'Overweight', value: 16.7 },
  { name: 'Obesity', value: 8.2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius * Math.cos(-midAngle * Math.PI / 180)) * 1.4;
  const y = cy + (radius * Math.sin(-midAngle * Math.PI / 180)) * 1.4;

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiValue, setBMIValue] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMIValue(bmi);

      let category = '';
      if (bmi < 18.5) {
        category = 'underweight';
      } else if (bmi >= 18.5 && bmi < 25) {
        category = 'normal';
      } else if (bmi >= 25 && bmi < 30) {
        category = 'overweight';
      } else {
        category = 'obese';
      }
      setBMICategory(category);
    } else {
      setBMIValue('');
      setBMICategory('');
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
          onChange={(e) => setHeight(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label htmlFor="weight">Enter Your Weight (kg):</label>
        <input
          type="number"
          placeholder="Enter your weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
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
        </div>
      )}
    </div>
  );
};


const StatisticsCards = () => (

  <div className='info-page pt-10'>

    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">
            Does your kid know what's healthy?
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            We can help you!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Embark on a noble quest with your children to uncover the wonders
            of healthy eating and why it matters! 🛡️🍏
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Want to learn more?
          </button>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5 z-50" src={family} alt="Family" />
        </div>
      </div>
    </div>
    <h1 className="header-title" style={{ fontSize: '36px', textAlign: 'center' }}>Welcome to Our Health Awareness Hub</h1>
    <p className="header-intro" style={{ fontSize: '23px' }}>Learn about the dangers of childhood obesity and sugary drinks! Many parents aren't aware of how these unhealthy habits can affect their children's health. We provide important information to help you understand the risks and make better choices for your family.</p>
    <h2 className="sub-header" style={{ fontSize: '28px' }}>Key Statistics</h2>
    <div className="card-container">
      {/* Statistic Cards Component */}
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <Statistic
              title="Childhood Obesity"
              value={25}
              suffix="%"
              prefix={<FaPerson />}
              valueStyle={{ fontSize: '34px' }}
            />
          </div>
          <div className="card-back">
            <p>25% overweight or obese (5-17 years)</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <Statistic
              title="Healthy Eating Habits"
              value={6}
              suffix="%"
              prefix={<GiFruitBowl />}
              valueStyle={{ fontSize: '34px' }}
            />
          </div>
          <div className="card-back">
            <p>6% meet fruit and veg recommendations</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <Statistic
              title="Sugar Awareness"
              value={9}
              suffix="%"
              prefix={<GiWrappedSweet />}
              valueStyle={{ fontSize: '34px' }}
            />
          </div>
          <div className="card-back">
            <p>9% adults, 7% children drink sugary drinks daily</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <Statistic
              title="Drink Smart"
              value={45}
              suffix="%"
              prefix={<GiSodaCan />}
              valueStyle={{ fontSize: '34px' }}
            />
          </div>
          <div className="card-back">
            <p>45% children consume sugary or diet drinks weekly (2-17 years)</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 className="sub-header" style={{ marginTop: '10px', fontSize: '28px', textAlign: 'center' }}>Weight status of Australian children aged 2-17 years</h2>
      <p style={{ fontSize: '23px' }}>Visual representation of weight status:</p>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80} // Increased inner radius
            outerRadius={140} // Increased outer radius
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="center" verticalAlign="top" />
        </PieChart>
      </ResponsiveContainer>
      {/* Add heading and image below the PieChart */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <h2 className="sub-header" style={{ fontSize: '28px' }}>Overweight and obesity by state and territory</h2>
        <div className="flex-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <img src={map} alt="Australia Obesity Map" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
          <div style={{ maxWidth: '600px' }}>
            <ul>
              <li>The prevalence of overweight and obesity in children varies between Australian states and territories.</li>
              <li>The highest prevalence of obesity in 2017-18 was in Tasmania (11.4%).</li>
              <li>The lowest was in Western Australia (7.2%).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* BMI Calculator component */}
    <h2 className="sub-header" style={{ marginTop: '10px', fontSize: '28px', textAlign: 'center' }}>Are you healthy? Check your BMI below!</h2>
    <BMICalculator />
  </div>
);


export default StatisticsCards;