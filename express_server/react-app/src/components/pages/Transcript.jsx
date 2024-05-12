import React, { useState, useEffect, useRef } from 'react';
import './FruitQuiz.css'; // Import the CSS file for styling

import { Button, Space } from 'antd';

import congratulationImg from '../assets/congratulation.gif'

export default function Transcript(data) {

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let values = Object.values(data.result);
    setTotal(values.length);
    setCount(values.filter(item => item === true).length)
  }, [])

  return (
    <>
      <div className="result-wrapper">
        <div className='score'>
          {/* {count}/{total} */}
          <img src={congratulationImg} alt="CONGRATULATIONS！" />
        </div>
        <div className='congrats'>
          <span>CONGRATULATIONS！</span>
          <span>You've done a great job, keep going</span>
        </div>
        <div className='detail'>
          <Space>
            <span>CORRECT {count}</span>
          </Space>
        </div>
        <div className='btn-wrapper'>
          <Space>
            <Button type="primary" onClick={data.reset}>TRY AGAIN</Button>
            <Button type="primary" onClick={data.back}>GO BACK TO JOURNEY</Button>
          </Space>
        </div>
      </div>
    </>
  );
}
