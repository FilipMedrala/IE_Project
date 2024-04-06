const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = process.env.PORT || 8080;

const app = express();
app.use(express.static('react-app/dist'));

app.use(cors());

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

// Route to pull data from 'quiz' table
app.get('/quiz', (req, res) => {
  const query = 'SELECT * FROM quiz';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error querying database: ' + error.stack);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});




// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.static('react-app/dist'));
// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })

// app.get('/api/pirates/:id', (req, res) => {
//     const id = req.params.id;
//     const pirate = getPirate(id);
//     if (!pirate) {
//         res.status(404).send({ error: `Pirate ${id} not found`});
//     }
//     else {
//         res.send({ data: pirate});
//     }
// })

// function getPirate(id) {
//     const pirates = [
//     {id: 1, name: 'test name'}
//     ];

//     return pirates.find(p => p.id == id);
// }

