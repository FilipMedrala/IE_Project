import React, { useState } from 'react';
import { Statistic, Input, Button } from 'antd'; // Import Ant Design components
import { FaPerson } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan, GiRun } from "react-icons/gi";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './StatisticsCards.css'; // Import CSS file for styling
import './bmi.css'
import map from "./assets/map.png";

import family from "./assets/family.jpg";
import game from "./assets/game.png";
import play from "./assets/play.png";
import info1 from "./assets/info1.png";
import info2 from "./assets/info2.png";
import info3 from "./assets/info3.png";
import info4 from "./assets/info4.png";
import info5 from "./assets/info5.png";


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
            Let's Dive into the Facts...
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Nurturing Today for a Bright Tomorrow!
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Dive into our comprehensive guide on the critical importance of children's nutrition.
            Backed by statistics and detailed insights, explore why prioritizing proper nutrition for kids is fundamental for their current well-being and sets the stage for a healthier, brighter future.
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5 z-50" src={info1} alt="Family" />
        </div>
      </div>
    </div>

    <section className="bg-white border-b py-8s">
      <div className="container max-w-5xl mx-auto m-8">
        <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
          Welcome to Our Health Awareness Hub! (WORK IN PROGRESS)
        </h2>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-5/6 sm:w-1/2 p-6">
            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
              Fight Against Sugar
            </h3>
            <p className="text-gray-600 mb-8">
              Many parents may not realize the hidden risks lurking within sugary beverages, often overshadowed by their enticing flavors.
              Yet, these drinks can stealthily contribute to weight gain, dental issues, and even chronic health conditions in children.
              By becoming informed and making mindful choices, parents can take proactive steps to safeguard their children's health and promote a future of vitality and well-being.

              <br />
              <br />
              <a
                className="text-pink-500 underline"
                href="https://undraw.co/"
              >
                Find out more
              </a>
            </p>
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <img className="w-full md:w-4/5 z-50" src={info5} alt="Sugar" />
          </div>
        </div>
        <div className="flex flex-wrap flex-col-reverse sm:flex-row">
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <img className="w-full md:w-4/5 z-50" src={info3} alt="Obesity" />
          </div>
          <div className="w-full sm:w-1/2 p-6 mt-6">
            <div className="align-middle">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Shedding Light on Childhood Obesity
              </h3>
              <p className="text-gray-600 mb-8">
                Explore the crucial insights into childhood obesity, tailored for parents seeking to navigate and address this pressing health concern.
                Discover actionable strategies, informed by expert guidance, to support your child's journey toward a healthier lifestyle and brighter future.
                <br />
                <br />
                <a
                  className="text-pink-500 underline"
                  href="https://undraw.co/"
                >
                  Find out more
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full">
            Is it really that bad?
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Understanding the scale of problem
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Explore a series of informative cards that visually depict crucial data related to childhood obesity, sugar consumption and eating habits.
            <br />
            <br />
            Gain insights into childhood obesity rates, adherence to healthy eating habits, awareness of sugar intake, and smart drinking practices.
            <br />
            <br />
            Empower yourself with knowledge to make informed decisions for your child's well-being.
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <img className="w-full md:w-4/5 z-50" src={info4} alt="Data" />
        </div>
        <h2 className="my-4 text-5xl font-bold leading-tight">
            Key Statistics:
        </h2>
      </div>
      <div className="card-container p-6">
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
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <Statistic
                title="Physical Activity"
                value={17}
                suffix="%"
                prefix={<GiRun />}
                valueStyle={{ fontSize: '34px' }}
              />
            </div>
            <div className="card-back">
              <p>Only 16.6% of Child were doing sufficient physical activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Weight status of Australian children aged 2-17 years
          </h1>
          <p className="leading-normal text-2xl mb-8">
            Hover over each segment to reveal detailed information about the prevalence of underweight, healthy weight, overweight, and obesity among children in Australia.
            <br />
            <br />
            Gain valuable insights into the current landscape of childhood weight status and use this data to inform decision-making and promote healthier lifestyles for children nationwide
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
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
        </div>
      </div>
    </div>

    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <div className="flex-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src={map} alt="Australia Obesity Map" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            In what zone are you?
          </h1>
          <p className="leading-normal text-2xl mb-8">

            Discover how childhood obesity rates vary across Australia with a map showcasing the percentage of obese children per state.
            <br />
            <br />
            By identifying areas with higher obesity rates, you can make better informed decisions about your children's lifestyle and healthcare, ensuring they receive the support and resources adequate to difficulties they face in their daily life.
          </p>
        </div>
      </div>
    </div>

    <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Calculate Your BMI
          </h1>
          <p className="leading-normal text-2xl mb-8">

            Assessing your health status is a very important step in understanding your overall well-being.
            By calculating your Body Mass Index (BMI), you can gain valuable insights into whether your weight falls within a healthy range for your height.
            <br />
            <br />
            Regularly monitoring your child's BMI can serve as a proactive measure in maintaining optimal health and preventing potential health complications associated with weight-related issues.
          </p>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Want to learn more?
          </button>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <BMICalculator />
        </div>
      </div>
    </div>
  </div>
);


export default StatisticsCards;