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



// Export all model functions for use in controllers
module.exports = {
    getUser,
};
