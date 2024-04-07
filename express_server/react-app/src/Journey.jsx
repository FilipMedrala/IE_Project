import React, { useState, useEffect, useRef } from "react";
import './FallingFood.css'
// import { Carousel } from 'antd';
//import { FullSlip, SlipItem } from "react-fullslip";
import { Button, Popover } from 'antd';
import pic1 from './assets/3.png'
import pic2 from './assets/4.png'
import pic3 from './assets/5.png'
import pic4 from './assets/6.png'
import pic5 from './assets/left-btn.png'
import pic6 from './assets/right-btn.png'
import broccoli from './assets/broccoli.png'
import carrot from './assets/carroct.png'
import Spanish from './assets/Spanish.png'
import sp from './assets/sweetpotato.png'
import { Carousel } from 'antd';
import Quiz from "./Quiz"
import axios from 'axios';


export default function FallingFood() {

  const [quizData, setQuizData] = useState(null);
  const myRef = useRef(null);

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
          stage1: [1, 3],
          stage2: [2, 3],
          stage3: [3, 3]
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
              <Popover 
                  content={
                    <div>
                      <ul>
                        <li>I give you Vitamin C to protect you from getting sick.</li>
                        <li>I support healthy skin and gums.</li>
                        <li>I can maintain a happy and healthy body.</li>
                        <li>Muscle fuel! Potassium powers you up!</li>
                        <li>I can help clean teeth a little, making me beneficial for oral health.</li>
                      </ul>
                    </div>
                  } 
                  title="Apple"
                >
                  <img className="icons icons0" src={pic1} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons1" src={pic2} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons2" src={pic3} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons3" src={pic4} alt="" />
                </Popover>
              </div>
            </div>
          </div>


          <div className="swiper">
            <div className="swiperInner" >
              <div className="leftIcon sameicon" onClick={() => { myRef?.current?.prev?.() }}>
                <img src={pic5} alt="" />
              </div>
              <div className="rightIcon sameicon" onClick={() => { myRef?.current?.next?.() }}>
                <img src={pic6} alt="" />
              </div>
              <Carousel dotPosition={'bottom'} ref={myRef}  >
              {quizData && quizData[0].map((question, index) => (
                <div className="swiperItem" key={index}>
                  {/* Render each question here */}
                  <Quiz quizData={question} />
                </div>
              ))}
              </Carousel>
            </div>
          </div>
        {/* veggie part */}
        </div>
        <div className="itembox itembox2" style={{ backgroundColor: '#C6E2FF' }}>
        <div className="firstPageContWrap">
            <div className="firstPageCont">
              <div>
                <Popover content={'People have developed several kinds of apples with different tastes.'} title="Title">
                  <img className="icons icons0" src={broccoli} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons1" src={carrot} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons2" src={Spanish} alt="" />
                </Popover>
              </div>
              <div>
                <Popover content={'2222222222222222'} title="Title">
                  <img className="icons icons3" src={sp} alt="" />
                </Popover>
              </div>
            </div>
          </div>


          <div className="swiper">
            <div className="swiperInner" >
              <div className="leftIcon sameicon" onClick={() => { myRef?.current?.prev?.() }}>
                <img src={pic5} alt="" />
              </div>
              <div className="rightIcon sameicon" onClick={() => { myRef?.current?.next?.() }}>
                <img src={pic6} alt="" />
              </div>
              <Carousel dotPosition={'bottom'} ref={myRef}  >
              {quizData && quizData[1].map((question, index) => (
                <div className="swiperItem" key={index}>
                  {/* Render each question here */}
                  <Quiz quizData={question} />
                </div>
              ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div className="itembox itembox3" style={{ backgroundColor: '#FFEC8B' }}>
          page3
        </div>
        <div className="itembox itembox4" style={{ backgroundColor: '#cccccc' }}>
          page4
        </div>
      {/* </FullSlip> */}
      {/* </Carousel> */}

    </div>
  );
}
