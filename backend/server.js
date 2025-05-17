// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// A simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your Express.js MySQL application backend!' });
});

// Define the port
const PORT = process.env.PORT || 8080; // Use port from .env or default to 8080

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});