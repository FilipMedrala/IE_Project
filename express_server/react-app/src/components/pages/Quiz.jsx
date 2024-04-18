import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Button, Modal } from 'antd';
import Transcript from './Transcript'
import { CloseCircleOutlined } from '@ant-design/icons';

import './FruitQuiz.css'; // Import the CSS file for styling

import apple from '../quiz_photo/healthy/apple.png';
import burger from '../quiz_photo/unhealthy/burger.png';
import cake from '../quiz_photo/unhealthy/cake.png';
import blue_berry from '../quiz_photo/healthy/blue_berry.png';
import candy from '../quiz_photo/unhealthy/candy.png';
import banana from '../quiz_photo/healthy/banana.png';
import broccoli from '../quiz_photo/healthy/broccoli.png';
import carrot from '../quiz_photo/healthy/carrot.png';
import potato from '../quiz_photo/healthy/potato.png';
import spinach from '../quiz_photo/healthy/spinach.png';
import cookie from '../quiz_photo/unhealthy/cookie.png';
import orange from '../quiz_photo/healthy/orange.png';
import fried_chicken from '../quiz_photo/unhealthy/friend_chicken.png';
import ice_cream from '../quiz_photo/unhealthy/ice_cream.png';
import donut from '../quiz_photo/unhealthy/donut.png';
import pizza from '../quiz_photo/unhealthy/pizza.png';
import pic5 from '../assets/left-btn.png'
import pic6 from '../assets/right-btn.png'


export default function Quiz(data) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizData, setQuizData] = useState(data.quizData);

  const myRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuizData(quizData.map(item => ({
      ...item,
      reverse: Math.random() > 0.5
    })))
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset()
  };

  const reset = () => {
    setShowResult(false)
    setCurrentQuestion(0)
    setAnswers([])
    myRef?.current?.goTo?.(0)
  }

  const imagesObj = {
    apple,
    burger,
    cake,
    blue_berry,
    candy,
    banana,
    cookie,
    orange,
    fried_chicken,
    ice_cream,
    broccoli,
    carrot,
    potato,
    spinach,
    donut,
    pizza,
  }

  const handleOptionClick = (value) => {
    setAnswers(prevState => {
      return {
        ...prevState,
        [`q${currentQuestion}`]: value
      }
    })
  };

  useEffect(() => {
    if (Object.keys(answers).length === quizData.length) {
      setTimeout(() => {
        sessionStorage.setItem('answers', JSON.stringify({
          type: data.type,
          answers,
        }))
        setShowResult(true)
      }, 1000)
    }
  }, [answers])

  return (
    <>
      <div className="exam-wrapper but">
        <Button size="large" type="primary" shape="round" onClick={showModal}>START</Button>
      </div>

      <Modal width={800} open={isModalOpen} onCancel={handleCancel} footer={null} closeIcon={<CloseCircleOutlined />}>
        {
          !showResult && <>
            <div className="swiper">
              <div className="swiperInner" >
                <div className="leftIcon sameicon" onClick={() => { myRef?.current?.prev?.() }}>
                  <img src={pic5} alt="" />
                </div>
                <div className="rightIcon sameicon" onClick={() => { myRef?.current?.next?.() }}>
                  <img src={pic6} alt="" />
                </div>
                <Carousel dotPosition='bottom' ref={myRef} infinite={false} afterChange={setCurrentQuestion}>
                  {quizData?.map((item, index) => (
                    <div className="swiperItem" key={index}>
                      <div className="container">
                        <div className="question">
                          <p>{item.question}</p>
                          <div className={`options ${item.reverse ? 'reverse' : ''}`}>
                            <button
                              disabled={index === currentQuestion && answers[`q${currentQuestion}`]}
                              onClick={() => handleOptionClick('a')}
                              className={index === currentQuestion && answers[`q${currentQuestion}`] === 'a' ? 'selected' : ''}
                            >
                              <img src={imagesObj[item.corAnswer]} alt="Option A" />
                            </button>
                            <button
                              disabled={index === currentQuestion && answers[`q${currentQuestion}`]}
                              onClick={() => handleOptionClick('b')}
                              className={index === currentQuestion && answers[`q${currentQuestion}`] === 'b' ? 'selected incor' : ''}
                            >
                              <img src={imagesObj[item.incorAnswer]} alt="Option B" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            {
              answers[`q${currentQuestion}`] ? (
                <div className='result'>
                  {
                    answers[`q${currentQuestion}`] === 'a'
                      ?
                      (<div className='right'>
                        you are right
                      </div>)
                      :
                      (<div className='wrong'>you are wrong</div>)

                  }
                </div>
              )
                : null
            }
          </>
        }
        {
          showResult && <Transcript result={answers} reset={reset} back={handleCancel} />
        }
      </Modal>
    </>
  );
}
