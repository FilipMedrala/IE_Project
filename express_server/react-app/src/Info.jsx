import React, { useState } from 'react';
import { Statistic } from 'antd';
import { FaPerson } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan } from "react-icons/gi";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './StatisticsCards.css'; // Import CSS file for styling
import map from "./assets/map.png"

const data = [
  { name: 'Underweight', value: 8.2 },
  { name: 'Normal weight', value: 66.9 },
  { name: 'Overweight', value: 16.7 },
  { name: 'Obesity', value: 8.2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (radius * Math.cos(-midAngle * Math.PI / 180)) * 1.4; // Adjusted x position
  const y = cy + (radius * Math.sin(-midAngle * Math.PI / 180)) * 1.4; // Adjusted y position

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

// Define the ranges and colors for the legend
const legendData = [
  { range: 'Less than 7%', color: '#FFC0CB' }, // Light pink
  { range: '7% to 8%', color: '#FF69B4' },     // Hot pink
  { range: '8% to 9%', color: '#FF1493' },     // Deep pink
  { range: 'More than 9%', color: '#C71585' }  // Medium violet red
];

const MapLegend = ({ legendData }) => (
  <div className="map-legend">
    {legendData.map((item, index) => (
      <div key={index} className="legend-item">
        <span className="legend-color" style={{ backgroundColor: item.color }}></span>
        <span className="legend-text">{item.range}</span>
      </div>
    ))}
  </div>
);

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    const heightInMeters = height / 100; // convert cm to meters
    const bmiValue = weight / (heightInMeters ** 2); // BMI formula
    setBMI(bmiValue.toFixed(2)); // Round to two decimal places
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 className="sub-header" style={{ fontSize: '28px' }}>Calculate Your BMI</h2>
      <form onSubmit={calculateBMI}>
        <div>
          <label htmlFor="height">Height (cm): </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="weight">Weight (kg): </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {bmi && <p>Your BMI is: {bmi}</p>}
    </div>
  );
};



const StatisticsCards = () => (
  <div className='info-page'>
    <h1 className="header-title" style={{ fontSize: '36px', textAlign: 'center'}}>Welcome to Our Health Awareness Hub</h1>
    <p className="header-intro" style={{ fontSize: '23px'}}>Learn about the dangers of childhood obesity and sugary drinks! Many parents aren't aware of how these unhealthy habits can affect their children's health. We provide important information to help you understand the risks and make better choices for your family.</p>
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
      <h2 className="sub-header" style={{ marginTop: '10px', fontSize: '28px' , textAlign: 'center'}}>Weight status of Australian children aged 2-17 years</h2>
      <p style={{ fontSize: '23px'}}>Visual representation of weight status:</p>
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
    <BMICalculator />

  </div>
);


export default StatisticsCards;