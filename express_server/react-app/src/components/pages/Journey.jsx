import React, { useState, useEffect, useRef } from "react";
import Quiz from "./Quiz"
import axios from 'axios';
import Character from './Character';
import { Button, Popover } from 'antd';

import './journey.css'
import './App.css'

import pic1 from '../assets/3.png'
import pic2 from '../assets/4.png'
import pic3 from '../assets/5.png'
import pic4 from '../assets/6.png'
import pic5 from '../assets/left-btn.png'
import pic6 from '../assets/right-btn.png'
import broccoli from '../assets/broccoli.png'
import carrot from '../assets/carroct.png'
import Spanish from '../assets/Spanish.png'
import sp from '../assets/sweetpotato.png'
import fixedImg from '../assets/fixedImg.png'
import fixedRoadImg from '../assets/fixedRoadImg.png'


export default function FallingFood() {

  const [quizData, setQuizData] = useState(null);
  const myRef = useRef(null);
  const myRef2 = useRef(null);

  useEffect(() => {
    // Fetch data from Express server when component mounts
    fetchQuizData();
  }, []);

  useEffect(() => {
    console.log("Stored data in journey: ", quizData);
  }, [quizData]);

  const fetchQuizData = async () => {
    try {
      // Make a GET request to your Express server endpoint with query parameters
      const response = await axios.get('http://localhost:8080/quiz', {
        params: {
          stage1: [1, 4],
          stage2: [2, 4],
          stage3: [3, 4]
        }
      });
      // Extract the data from the response
      const data = response.data;
      // Set the quiz data state variable with the retrieved data
      setQuizData(data);
      console.log("Received data in journey: ", data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };


  return (
    <div className="Journey">
      <Character src={fixedImg} />
      {/* <img className="fixedImg" src={fixedImg} />
      <div className="fixedRoadImg" ></div> */}
      {/* <div className="header">Journey</div> */}
      {/* <FullSlip {...{
        navigation: false,           //是否开启导航点,      默认为true
        activeClass: 'active',      //自定义导航点类名,    默认为active, .navigation-dot下的.active
        duration: 1000,              //屏幕滑动切换的时间,  默认为1000
        transverse: false,            //是否更改为横向滑动,  默认为false
        // navImage:[require('./assets/1.jpg'),require('./assets/2.jpg'),require('./assets/3.jpg')],   //导航点图片,可选,默认无图片
        arrowNav: true,              //是否开启箭头导航     默认false不开启
      }}> */}

      {/* <Carousel dotPosition={'right'}> */}
      <div className="itembox itembox1" style={{ backgroundColor: '#C1FFC1' }}>
        <div className="firstPageContWrap">
          <div className="firstPageCont">
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I give you Vitamin C to protect you from getting sick.</li>
                    <li>I support healthy skin and gums.</li>
                    <li>I can maintain a happy and healthy body.</li>
                  </ol>
                </div>
              } title="Apple">
                <img className="icons icons0" src={pic1} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I provide you with Vitamin B6, which helps your body make energy.</li>
                    <li>I'm like a natural energy bar, perfect for keeping you active and strong.</li>
                    <li>I can also help with brain function, making me a smart choice for snack time!</li>
                  </ol>
                </div>
              } title="Banana">
                <img className="icons icons1" src={pic2} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm rich in Vitamin K, helping your blood to clot and your bones to stay strong.</li>
                    <li>I can boost your brain power.</li>
                    <li>I can keep your memory sharp.</li>
                  </ol>
                </div>
              } title="Blueberry">
                <img className="icons icons2" src={pic3} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm loaded with Vitamin C, your superhero against colds and flu.</li>
                    <li>I keep your skin glowing and your gums healthy, so you can smile bright!</li>
                    <li>Drinking my juice can quench your thirst and keep you hydrated on hot days.</li>
                  </ol>
                </div>
              } title="Orange">
                <img className="icons icons3" src={pic4} alt="" />
              </Popover>
            </div>
          </div>
        </div>

        {quizData?.length > 0 && <Quiz quizData={quizData[0]} type="stage1" />}

        {/* veggie part */}
      </div>
      <div className="itembox itembox2" style={{ backgroundColor: '#C6E2FF' }}>
        <div className="firstPageContWrap">
          <div className="firstPageCont">
            <div>

              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm your green powerhouse, loaded with Vitamin C to keep your immune system strong.</li>
                    <li>I'm a superhero for your eyes, with Vitamin A to keep your vision sharp.</li>
                    <li>I'm packed with fiber, which keeps your tummy happy and digestion smooth.</li>
                  </ol>
                </div>
              } title="Broccoli">
                <img className="icons icons0" src={broccoli} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm your orange buddy, packed with Vitamin A to keep your eyesight sharp.</li>
                    <li>I help your skin glow and heal, making you look and feel your best.</li>
                    <li>I'm a crunchy delight that makes snack time fun and nutritious!</li>
                  </ol>
                </div>
              } title="Carrot">
                <img className="icons icons1" src={carrot} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm bursting with Vitamin K, which is great for bone health and helps with blood clotting.</li>
                    <li>Eating me can boost your energy levels and keep you feeling vibrant.</li>
                    <li>Add me to your salads, sandwiches, or smoothies for a nutritious punch!</li>
                  </ol>
                </div>
              } title="Spinach">
                <img className="icons icons2" src={Spanish} alt="" />
              </Popover>
            </div>
            <div>
              <Popover content={
                <div>
                  <ol style={{ listStyleType: 'decimal' }}>
                    <li>I'm your starchy friend, providing energy to keep you going throughout the day.</li>
                    <li>Don't peel me! My skin is loaded with fiber and nutrients.</li>
                    <li>I'm rich in potassium, which helps keep your heart beating strong.</li>
                  </ol>
                </div>
              } title="Sweet Potato">
                <img className="icons icons3" src={sp} alt="" />
              </Popover>
            </div>
          </div>
        </div>

        {quizData?.length > 0 && <Quiz quizData={quizData[1]} type="stage2" />}
      </div>
      {/* <div className="itembox itembox3" style={{ backgroundColor: '#FFEC8B' }}>
        page3
      </div>
      <div className="itembox itembox4" style={{ backgroundColor: '#cccccc' }}>
        page4
      </div> */}
      {/* </FullSlip> */}
      {/* </Carousel> */}

    </div>
  );
}
