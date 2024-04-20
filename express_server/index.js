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


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Query to check if the user exists
//   const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
//   // Execute the query
//   connection.query(query, [username, password], (error, results) => {
//     if (error) {
//       console.error('Error querying database:', error);
//       res.status(500).send('Error querying database');
//       return;
//     }

//     // Check if any rows were returned
//     if (results.length > 0) {
//       // If the user exists, respond with a success message
//       console.log(`Successful login as ${username}.`);
//       res.json({ success: true, message: 'Login successful' });
//     } else {
//       // If the user does not exist or the password is incorrect, respond with an error message
//       res.status(401).json({ success: false, message: 'Invalid username or password' });
//     }
//   });

  // Close the connection
  // connection.end();
// });


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
