import React from 'react';
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

const StatisticsCards = () => (
  <div className='info-page'>
    <h1 className="header-title" style={{ fontSize: '36px' }}>Welcome to Our Health Awareness Hub</h1>
    <h2 className="sub-header" style={{ fontSize: '28px' }}>Key Statistics</h2>
    <p className="header-intro">Unlock Vital Insights for a Healthier Tomorrow! Welcome to our Health Awareness Hub, your ultimate resource for accessing crucial health statistics that have the power to transform lives and communities. In this comprehensive repository of knowledge, we provide a wealth of data meticulously curated from reputable sources, covering a wide spectrum of health-related topics. Whether you're interested in understanding the prevalence of childhood obesity, the state of healthy eating habits, or the impact of sugar consumption on overall well-being, you'll find a wealth of information at your fingertips. Our goal is to empower you with the knowledge and understanding needed to make informed decisions about your health and lifestyle choices. Together, let's embark on a journey towards better health outcomes and a brighter future for generations to come.</p>
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
            <p>Click <a href="#healthy-eating">here</a> to explore more statistics.</p>
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
            <p>Click <a href="#sugar-awareness">here</a> to explore more statistics.</p>
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
            <p>Click <a href="#drink-smart">here</a> to explore more statistics.</p>
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
            <p>Click <a href="#childhood-obesity">here</a> to explore more statistics.</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2 className="sub-header" style={{ fontSize: '28px' }}>Weight status of Australian children aged 2-17 years</h2>
      <p style={{ fontSize: '18px' }}>Visual representation of weight status:</p>
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
        <h2>Australia Obesity</h2>
        <img src={map} alt="Australia Obesity Map" style={{ maxWidth: '60%', height: 'auto', alignContent: 'center'}} />
      </div>
    </div>
  </div>
);


export default StatisticsCards;
