// backend/config/db.js

//Load environment variables
require('dotenv').config();

//Use mysql2/promise for async/await support
const mysql = require('mysql2/promise')

//Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: 8007,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'cc241049',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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


module.exports = pool;