import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './information.css'; // Import CSS file for styling
import StatisticsCards from './stat_cards';
import ChildObeseTrend from './child_obese_trend';
import SugarIntake from './sugar_consumption';
import Daily_Consumption from './daily_consumption';
import DeathFactor from './death_factors'
import './bmi.css';
import map from "../assets/map.png";
import info1 from "../assets/info1.png";



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


const Info = () => (
  <div>
      <div className="pt-24 bg-gradient-to-r from-cyan-300 to-blue-900" >
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/* Text Column */}
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <h1 className="my-4 text-5xl font-bold leading-tight">
          Nurturing Today for a Bright Tomorrow!
        </h1>
        <p className="leading-normal text-2xl mb-8">
          Dive into our comprehensive guide on the critical importance of children's nutrition.
          Backed by statistics and detailed insights, explore why prioritizing proper nutrition for kids is fundamental for their current well-being and sets the stage for a healthier, brighter future.
        </p>
      </div>
      
      {/* Image Column */}
      <div className="w-full md:w-3/5 py-6 text-center">
        <img className="w-full md:w-4/5 z-50" src={info1} alt="Family" />
      </div>
    </div>
  </div>

    <section className="bg-white border-b py-8s">
      <div className="container max-w-5xl mx-auto m-8">        
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
        </div>
        <div className="container max-w-5xl mx-auto m-8">
          <div className="grid md:grid-cols-1 gap-4">
            <div className="text-gray-600 text-lg">
              <h1 className="my-4 text-5xl font-bold leading-tight">
                Welcome to the Health Awareness Hub
                </h1>
                <p className="text-center mb-4">
                Begin your journey to health with the essential knowledge needed in our fast-paced world. Our platform offers up-to-date statistics and actionable insights for a healthier lifestyle. Remember, the numbers reflect our habits and the collective health of our society.
                <br/>
                <br/>
                Explore the data, understand the trends, and learn how even small choices, like reducing sugary drinks, can significantly improve our well-being. Let’s make informed decisions to foster healthier lives for ourselves and our communities.
                </p>
                <h3 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">
                  Explore our key statistics
                <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
                <StatisticsCards />
                <div class="w-4/5 border-t border-gray-500 my-10 mx-auto"></div>
              </h3>
              
            </div>
            </div>
          </div>
        </div>
    <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
      Let's Dive into the Facts.
    </h2>
    <div className="pt-24 bg-white">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '5px', textAlign: 'center' }}>
            <Daily_Consumption />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <h1 className="my-4 text-4xl font-bold leading-tight">
            Daily Consumption of Food Groups from 2018 to 2023
          </h1>
          <p className="leading-normal text-2xl mb-8">
            This graph illustrates the consumption trends across five different food groups alongside the recommended serves, over the years from 2018 to 2023.
            <br />
            <br />
            The trends underscore a significant public health concern, emphasizing the need for daily food consumption to align with the recommended serves as per Australian Guidelines.
          </p>
        </div>
      </div>
    </div>

    <div className="pt-24 bg-white">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left mb-8">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Sugar Consumption Trends in Australia: 2018-2023
          </h1>
          <br/>
          <br/>
          <p className="leading-normal text-2xl mb-8">
            This visualization tracks the consumption of free sugars in Australia from 2018 to 2023. 
          <br/>
          <br/>
            In 2022-23, the per capita daily intake of free sugars was 67 grams, accounting for 12.3% of dietary energy from retail food sales—exceeding the World Health Organisation's recommendation of less than 10%. Major contributors included sugars and syrups (19%), soft drinks (14%), and chocolate (11%). The data underscores the need for targeted dietary improvements to align with global health standards.
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <SugarIntake />
          </div>
        </div>
      </div>
    </div>

    <div className="pt-24 bg-white">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
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
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="center" verticalAlign="top" />
          </PieChart>
        </ResponsiveContainer>
      </div>
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
    </div>
  </div>

  <div className="pt-24 bg-white">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left mb-8">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Child & Adolescent Overweight Prevalence
          </h1>
          <p className="leading-normal text-2xl mb-8">
            This visualization tracks the prevalence of overweight among children and adolescents in Australia from 2006 to 2016, comparing it with selected countries.
          </p>
          <p className="leading-normal text-2xl mb-8">
            Selected comparable nations—Japan, New Zealand, the United Kingdom, and the United States—aid in understanding global obesity trends alongside Australia, offering insights and strategies.          </p>
          <p className="leading-normal text-2xl mb-8">
            The prevalence of overweight among children and adolescents in Australia increased from 32 % in 2006 to 34.1% in 2016, reflecting broader trends observed in the comparison countries.
          </p>
        </div>
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <ChildObeseTrend />
          </div>
        </div>
      </div>
    </div>
    
    <div className="pt-24 bg-white">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 py-6 text-center">
            <div style={{ marginTop: '5px', textAlign: 'center' }}>
                <DeathFactor />
            </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <h1 className="my-4 text-4xl font-bold leading-tight">
                Health Risks from Dietary and Lifestyle Factors in Australia (2019)
            </h1>
            <p className="leading-normal text-2xl mb-8">
                The graph presents a stark illustration of the fatal impacts of dietary and lifestyle choices in Australia for the year 2019.
                <br />
                <br />
                It highlights the significant health risks associated with obesity, low physical activity, and inadequate intake of essential food groups such as whole grains, fruits, and vegetables. These factors lead the chart in contributing to mortality, emphasizing the urgent need for public health interventions to promote healthier eating and more active lifestyles.
            </p>
        </div>
    </div>
</div>


    <div className="pt-24 bg-white" >
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
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
        <div className="w-full md:w-3/5 py-6 text-center">
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <div className="flex-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src={map} alt="Australia Obesity Map" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* <Modal
        width={800}
        open={open}
        onOk={handleOk}
        onCancel={handleOk}
        footer={[
          <Button
            block
            onClick={handleOk}
            className="start-btn"
          >
            VIEW INFORMATION!
          </Button>
        ]}
      >
        <img src={guidelineImg} alt="guideline" />
      </Modal> */}
</div>


);


export default Info;
