const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require('fs');

const port = process.env.PORT || 8080;
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('react-app/dist'));
app.use(cors());
app.use(express.json());

const { exec } = require('child_process');

app.post('/uploadImage', (req, res) => {
    // Assume req.body.imageData contains base64-encoded image data
    const base64Data = req.body.imageData.replace(/^data:image\/png;base64,/, "");

    fs.writeFile("out.png", base64Data, 'base64', function(err) {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).json({ error: 'Failed to save image' });
        } else {
            console.log('Image saved successfully: out.png');
            
            // Execute the Python script as a child process
            exec('python predict.py out.png', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing Python script:', error);
                    res.status(500).json({ error: 'Failed to execute Python script' });
                    return;
                }
                if (stderr) {
                    console.error('Python script stderr:', stderr);
                    res.status(500).json({ error: 'Python script encountered an error' });
                    return;
                }

                // Parse the JSON output from the Python script
                const predictionResult = JSON.parse(stdout);

                // Send the prediction result back to the client
                res.json({ prediction: predictionResult });
            });
        }
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
  const { stage1, stage2, stage3 } = req.query;
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
    for (const stage of [stage1, stage2, stage3]) {
      if (stage) {
        // Parse the input parameters to ensure they are integers
        const stageInt = parseInt(stage[0]);
        const countInt = parseInt(stage[1]);
        
        // Check if the parsed integers are valid numbers
        if (!isNaN(stageInt) && !isNaN(countInt)) {
          const randomRows = await fetchRandomRowsForStage(stageInt, countInt);
          stageData.push(randomRows);
        } else {
          console.error('Invalid input:', stage);
        }
      }
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
