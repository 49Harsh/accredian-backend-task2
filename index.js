// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '49@Harosh',
  database: 'referral_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    res.send('Hello from your backend!');
});

// API Endpoint
app.post('/api/referrals', (req, res) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;
  const sql = 'INSERT INTO referrals (referrer_name, referrer_email, referee_name, referee_email, course) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [referrerName, referrerEmail, refereeName, refereeEmail, course], (err, result) => {
    if (err) {
      console.error('Error saving referral:', err);
      res.status(500).json({ error: 'Error saving referral' });
    } else {
      res.status(201).json({ message: 'Referral saved successfully', id: result.insertId });
    }
  });
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));