import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fetch() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    // Fetch data from Express server when component mounts
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      // Make a GET request to your Express server endpoint
      const response = await axios.get('http://localhost:8080/quiz');
      // Extract the data from the response
      const data = response.data;
      // Set the quiz data state variable with the retrieved data
      setQuizData(data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  return (
    <div>
      <h1>Quiz Data</h1>
      <ul>
        {quizData.map((item) => (
          <li key={item.id}>{item.question}</li> 
        ))}
      </ul>
    </div>
  );
}
