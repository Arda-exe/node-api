require('dotenv').config();
const mysql = require('mysql2/promise');

async function resetDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  try {
    console.log('Dropping database...');
    await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
    console.log('Creating database...');
    await connection.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    console.log('Database reset successfully!');
    console.log('Now run: npm start');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await connection.end();
  }
}

resetDatabase();
