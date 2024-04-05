import React from 'react';
import { Statistic } from 'antd';
import { FaPerson } from "react-icons/fa6";
import { GiFruitBowl, GiWrappedSweet, GiSodaCan } from "react-icons/gi";
import './StatisticsCards.css'; // Import CSS file for styling

const StatisticsCards = () => (
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
);

export default StatisticsCards;
