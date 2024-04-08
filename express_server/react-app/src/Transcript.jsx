import React, { useState, useEffect, useRef } from 'react';
import './FruitQuiz.css'; // Import the CSS file for styling

import { Carousel, Button, Modal, Space } from 'antd';

export default function Transcript(data) {

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let values = Object.values(data.result);
    setTotal(values.length);
    setCount(values.filter(item => item === 'a').length)
  }, [])

  return (
    <>
      <div className="result-wrapper">
        <div className='score'>
          {count}/{total}
        </div>
        <div className='detail'>
          <Space>
            <span>正确 {count}</span>
            <span>错误 {total - count}</span>
          </Space>
        </div>
        <div className='btn-wrapper'>
          <Space>
            <Button type="primary" onClick={data.reset}>重做</Button>
            <Button type="primary" onClick={data.back}>返回</Button>
          </Space>
        </div>
      </div>
    </>
  );
}
