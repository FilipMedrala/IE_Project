const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');

const port = process.env.PORT || 8080;
const path = require('path');
const app = express();
app.use(express.static('react-app/dist'));
app.use(cors());
app.use(express.json());


// Route to handle image upload
app.post('/uploadImage', (req, res) => {
  // Assume req.body.imageData contains base64-encoded image data
  const base64Data = req.body.imageData.replace(/^data:image\/png;base64,/, "");

  fs.writeFile("recognition_nn/sketch_images/out.png", base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).json({
        error: 'Error saving image'
      });
    } else {
      res.json({
        message: 'Image saved successfully'
      });
    }
  });
});

app.post('/getPrediction', (req, res) => {
  const { spawn } = require('child_process');
  const pythonProcess = spawn('python', ['recognition_nn/predict.py']);

  let result = '';
  let errorOccurred = false;
  let errorMessage = ''; // Variable to store detailed error message

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
    console.log('Received prediction result:', result);
  });

  // Capture stderr output from the Python process
  pythonProcess.stderr.on('data', (data) => {
    errorMessage += data.toString();
    console.error('Error message from Python script:', errorMessage);
    errorOccurred = true;
  });

  pythonProcess.on('close', (code) => {
    console.log('Python script process exited with code:', code);
    if (errorOccurred) {
      // If an error occurred during execution, send an error response with detailed message
      console.error(`Python script process exited with code ${code}. Error message: ${errorMessage}`);
      res.status(500).json({
        error: 'Error in Python script',
        message: errorMessage // Send detailed error message to the client
      });
    } else {
      console.log('Prediction result:', result);
      res.json({
        prediction: result
      });
    }
  });

  pythonProcess.on('error', (err) => {
    console.error('Error spawning Python process:', err);
    res.status(500).json({
      error: 'Error spawning Python process'
    });
  });
});







// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: 'sql6697100',
  password: '26wPzBsrrM',
  database: 'sql6697100'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Route to pull data from 'quiz' table with filtering based on stage and number of rows
app.get('/quiz', async (req, res) => {
  const queryObj = req.query;
  try {
    // Function to execute a SQL query with parameters and return a promise
    const queryDatabase = (sql, params) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, results, fields) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    // Function to fetch random rows for a given stage using a parameterized query
    const fetchRandomRowsForStage = async (stage, count) => {
      const sql = 'SELECT * FROM quiz WHERE stage = ? ORDER BY RAND() LIMIT ?';
      const rows = await queryDatabase(sql, [stage, count]);
      return rows;
    };

    // Fetch and send data for each stage
    const stageData = [];

    let stageValue = Object.values(queryObj);

    for (const stage of stageValue) {
      let sql = `SELECT *FROM (  SELECT *  FROM QuizQuestions  WHERE Category = '${stage}'  ORDER BY RAND()  LIMIT 5) AS Category1`;
      const rows = await queryDatabase(sql, null);
      stageData.push(rows);
    }
    res.json(stageData);
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).send('Error querying database');
  }
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-app', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});