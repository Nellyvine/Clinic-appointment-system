const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'clinic_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Uses the promise-based API so controllers can use async/await
const db = pool.promise();

module.exports = db;