import React from 'react';
import { Statistic } from 'antd';
import { FaPerson } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan } from "react-icons/gi";
import './StatisticsCards.css'; // Import CSS file for styling

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
    <h2 className="sub-header" style={{ fontSize: '28px' }}>Obesity trends in Australian children</h2>
    <p className="header-vizz"> The prevalence of overweight among Australians aged 2 to 17 years was 16.7% , and the prevalence of obesity was 8.2% in 2017–18 </p>

  </div>
);

export default StatisticsCards;
