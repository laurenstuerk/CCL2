// src/models/userModels.js

// Import bcrypt to securely hash and compare passwords
const bcrypt = require("bcrypt");

// Import the promise-based MySQL pool from database config
const db = require('../config/db');


//Get a user by ID from the 'users' table.
//param {number} id - User ID
//returns {Object|null} - The user object or null if not found
async function getUser(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null; // Return user or null if not found
}


async function getUserByUsername(username) {
  const [rows] = await db.execute(
    'SELECT id, name, surname, username, phoneNumber, email, role, info, `rank`, profilePicture FROM users WHERE username = ?',
    [username]
  );
  return rows[0]; // return user or undefined
}

async function getPublicUserByUsername(username) {
  const [rows] = await db.execute(
    'SELECT id, name, surname, username, phoneNumber, email, role, info, `rank`, profilePicture FROM users WHERE username = ?',
    [username]
  );
  return rows[0]; // return user or undefined
}


async function updateUser(id, user) {
    const { name, email, password } = user;

    // Optionally hash password if provided
    let hashedPassword = null;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = hashedPassword
        ? "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?"
        : "UPDATE users SET name = ?, email = ? WHERE id = ?";

    const params = hashedPassword
        ? [name, email, hashedPassword, id]
        : [name, email, id];

    await db.execute(query, params);

    return { id, name, email };
}

async function deleteUser(id) {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
}



// Export all model functions for use in controllers
module.exports = {
    getUser,
    updateUser,
    deleteUser,
    getUserByUsername,
    getPublicUserByUsername
};
