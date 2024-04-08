import React, { useState, useEffect } from "react";
import sun from './assets/1.jpg'
import mid from './assets/2.jpg'
import game from './assets/play.png'
import { Button } from 'antd';
import { Link } from "react-router-dom";
export default function FallingFood() {

  return (
    <div>
      <div className="home">
        <div className="title">
        Helping Kids Develop Healthy Habits in a More Fun Way
        </div>
        <div className="conts">
         <p>Nutritional education is a pressing concern for parents across Australia, who grapple with the challenge of instilling healthy eating habits in their children. In a landscape dominated by sugary snacks and beverages, convincing children of the importance of nutrient-rich foods remains an uphill battle for many families.</p>
         <p>Our website finds innovative solutions to simplify the complexity of nutrition education and is dedicated to helping children understand healthy eating and gain knowledge at the same time through simple and fun games.</p>
        </div>
        <div className="but">
          <Link to="/Journey">
            <Button size="large" type="primary" shape="round">START</Button>
          </Link>

        </div>
        <img className="img" src={sun} alt="" />
      </div>
      <div className="mid">
        <div className="left">
          <img className="img1" src="../src/assets/family.jpg" alt="" />
        </div>
        <div className="right">
          
          <div className="conts">
          Help kids develop healthy eating habits, so they can learn and grow while having fun. Through a well-designed journey, kids will explore trivia about healthy food and reinforce what they've learned with fun quizzes.
            <div className="but">
              <Link to="/info">
                <Button size="large" type="primary" shape="round">LEARN MORE</Button>
              </Link>

            </div>
          </div>
        </div>
      </div>
      <img className="img" src={mid} alt="" />
      <div className="bot">
        <div className="conts">
        We offer Snake Game and Falling Food Game for kids.The games are simple and fun, with a healthy food theme to help your kids subconsciously gain nutritional knowledge while relaxing.
        </div>
        <div className="but">

          <Link to="/Game">
            <Button size="large" type="primary" shape="round">PLAY</Button>
          </Link>

        </div>

      </div>
    </div>
  );
}
