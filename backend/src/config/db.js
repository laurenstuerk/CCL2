// backend/config/db.js

//Load environment variables
require('dotenv').config

//Use mysql2/promise for async/await support
const mysql = require('mysql/promise')

//Create a connection pool
const pool = mysql.createPool({
     HOST: process.env.DB_HOST,
     PORT: process.env.DB_PORT,
     USER: process.env.DB_USER,
     PASSWORD: process.env.DB_PASSWORD,
     DB: process.env.DB_NAME,
     waitForConnection: true,
     connectionLimit: 10,
     queueLimit: 0,
});

//Test the connection
pool.getConnection()
    .then((connection) => {
        console.log('Connected to the database ✔');
        connection.release(); // Release the connection back to the pool
    })
    .catch((error) => {
        console.error('❌ Error connecting to the database:', error);
    });

modeul.export = pool;