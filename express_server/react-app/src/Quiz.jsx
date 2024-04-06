import React, { useState } from 'react';
import './FruitQuiz.css'; // Import the CSS file for styling
import appleImage from './quiz_photo/healthy/apple.png';
import burgerImage from './quiz_photo/unhealthy/burger.png';
import cakeImage from './quiz_photo/unhealthy/cake.png';
import blueberryImage from './quiz_photo/healthy/blue_berry.png';
import candyImage from './quiz_photo/unhealthy/candy.png';
import bananaImage from './quiz_photo/healthy/banana.png';
import cookieImage from './quiz_photo/unhealthy/cookie.png';
import orangeImage from './quiz_photo/healthy/orange.png';

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: ''
    });

    const questions = [
        "Which one helps your body stay strong and healthy?",
        "Which is better for your body?",
        "Which choice makes you feel good and strong?",
        "Which one is good for keeping your body happy and strong?",
        "Which one helps your body grow and be strong?",
        "Which choice gives your body the good stuff it needs to be strong?",
        "Which one helps your body work its best?",
        "Which one helps your body stay happy and healthy?",
        "Which choice is like giving your body a big hug?",
        "Which one is like super fuel for your body?"
    ];

    const images = [
        { a: appleImage, b: burgerImage },
        { a: blueberryImage, b: candyImage },
        { a: bananaImage, b: cookieImage },
        { a: orangeImage, b: cakeImage },
        { a: appleImage, b: candyImage },
        { a: blueberryImage, b: burgerImage },
        { a: bananaImage, b: cookieImage },
        { a: orangeImage, b: cakeImage },
        { a: appleImage, b: candyImage },
        { a: blueberryImage, b: burgerImage }
    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.slice(0, 4);
    };

    if (selectedQuestions.length === 0) {
        setSelectedQuestions(shuffleArray([...questions]));
    }

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
                <p>{selectedQuestions[currentQuestion - 1]}</p>
                <div className="options">
                    <button
                        onClick={() => handleOptionClick('a')}
                        className={answers[`q${currentQuestion}`] === 'a' ? 'selected' : ''}
                    >
                        <img src={images[currentQuestion - 1].a} alt="Option A" />
                    </button>
                    <button
                        onClick={() => handleOptionClick('b')}
                        className={answers[`q${currentQuestion}`] === 'b' ? 'selected' : ''}
                    >
                        <img src={images[currentQuestion - 1].b} alt="Option B" />
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
