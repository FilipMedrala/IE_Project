import React, { useState, useEffect, lazy } from 'react';
import './FruitQuiz.css'; // Import the CSS file for styling
import apple from './quiz_photo/healthy/apple.png';
import burger from './quiz_photo/unhealthy/burger.png';
import cake from './quiz_photo/unhealthy/cake.png';
import blueberry from './quiz_photo/healthy/blue_berry.png';
import candy from './quiz_photo/unhealthy/candy.png';
import banana from './quiz_photo/healthy/banana.png';
import cookie from './quiz_photo/unhealthy/cookie.png';
import orange from './quiz_photo/healthy/orange.png';
import axios from 'axios';

export default function Quiz(data) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    console.log(data.quizData.corAnswer)

    const images = [
        { a: apple, b: burger },
        { a: blueberry, b: candy },
        { a: banana, b: cookie },
        { a: orange, b: cake },
        { a: apple, b: candy },
        { a: blueberry, b: burger },
        { a: banana, b: cookie },
        { a: orange, b: cake },
        { a: apple, b: candy },
        { a: blueberry, b: burger }
    ];


    const handleOptionClick = (value) => {
        setAnswers(prevState => ({
            ...prevState,
            [`q${currentQuestion}`]: value
        }));
    };

    const handleSubmit = () => {
        if (answers[`q${currentQuestion}`] === '') {
            alert('Please select an answer before proceeding.');
            return;
        }

        if (currentQuestion < 4) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const correctCount = Object.values(answers).filter(answer => answer === 'a').length;
            const percentage = (correctCount / 4) * 100;
            alert(`Your score: ${percentage}%`);
        }
    };

    return (
        <div className="container">
            <h2 className="title">Fruit Quiz</h2>
            <div className="question">
                <p>{data.quizData.question}</p>
                <div className="options">
                    <button
                        onClick={() => handleOptionClick('a')}
                        className={answers[`q${currentQuestion}`] === 'a' ? 'selected' : ''}
                    >
                        <img src={`${data.quizData.corAnswer}`} alt="Option A" />
                    </button>
                    <button
                        onClick={() => handleOptionClick('b')}
                        className={answers[`q${currentQuestion}`] === 'b' ? 'selected' : ''}
                    >
                        <img src={`${data.quizData.incorAnswer}`} alt="Option B" />
                    </button>
                </div>
            </div>
            <button
                className="submit-button"
                onClick={handleSubmit}
            >
                {currentQuestion < 4 ? 'Next Question' : 'Submit Answers'}
            </button>
        </div>
    );
}
