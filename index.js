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
  host: 'sql12.freesqldatabase.com',
  user: 'sql12720924',
  password: 'YWe9Gdxeac',
  database: 'sql12720924'
});

// Host: sql12.freesqldatabase.com
// Database name: sql12720924
// Database user: sql12720924
// Database password: YWe9Gdxeac
// Port number: 3306

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS referrals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referrer_name VARCHAR(255) NOT NULL,
  referrer_email VARCHAR(255) NOT NULL,
  referee_name VARCHAR(255) NOT NULL,
  referee_email VARCHAR(255) NOT NULL,
  course VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

db.query(createTableSQL, (err, result) => {
if (err) {
  console.error('Error creating table:', err);
} else {
  console.log('Referrals table created or already exists');
}
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