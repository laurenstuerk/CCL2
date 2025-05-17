// src/models/userModels.js

// Import bcrypt to securely hash and compare passwords
const bcrypt = require("bcrypt");

// Import the promise-based MySQL pool from database config
const db = require('../config/db');

/**
 * Get a user by ID from the 'users' table.
 * @param {number} id - User ID
 * @returns {Object|null} - The user object or null if not found
 */
async function getUser(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null; // Return user or null if not found
}

// Function to create a new user
/**
 * Create a new user in the 'users' table.
 * @param {Object} user - User object containing name, email, and password
 * @returns {Object} - The newly created user object
 */
async function createUser(user) {
  // Make sure to hash password before inserting (optional, but recommended)
  const { name, email, password } = user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  // Return the newly created user
  return {
    id: result.insertId,
    name,
    email,
  };
}



// Export all model functions for use in controllers
module.exports = {
    getUser,
    createUser,
};
