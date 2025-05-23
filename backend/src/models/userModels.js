// src/models/userModels.js

// Import bcrypt to securely hash and compare passwords
const bcrypt = require("bcrypt");

// Import the promise-based MySQL pool from database config
const db = require("../config/db");

//Get a user by ID from the 'users' table.
//param {number} id - User ID
//returns {Object|null} - The user object or null if not found
async function getUser(id) {
  const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null; // Return user or null if not found
}

async function getUserByUsername(username) {
  const [rows] = await db.execute(
    "SELECT id, name, surname, username, phoneNumber, email, role, info, `rank`, profilePicture FROM users WHERE username = ?",
    [username]
  );
  return rows[0]; // return user or undefined
}

async function getPublicUserByUsername(username) {
  const [rows] = await db.execute(
    "SELECT id, name, surname, username, phoneNumber, email, role, info, `rank`, profilePicture FROM users WHERE username = ?",
    [username]
  );
  return rows[0]; // return user or undefined
}

async function updateUser(token, id, userData = {}) {
  const {
    name,
    surname,
    username,
    phoneNumber,
    email,
    country,
    birthdate,
    info,
  } = userData;

  let query = `
    UPDATE users SET
      name = ?,
      surname = ?,
      username = ?,
      phoneNumber = ?,
      email = ?,
      country = ?,
      birthdate = ?,
      info = ?
  `;

  const params = [
    name || null,
    surname || null,
    username || null,
    phoneNumber || null,
    email || null,
    country || null,
    birthdate || null,
    info || null
  ];

  query += ` WHERE id = ?`;
  params.push(id);

  await db.execute(query, params);

  return {
    id,
    name,
    surname,
    username,
    phoneNumber,
    email,
    country,
    birthdate,
    info,
  };
}

async function deleteUser(id) {
  await db.execute("DELETE FROM users WHERE id = ?", [id]);
}

async function updateProfilePicture(userId, imageUrl) {
  const query = "UPDATE users SET profilePicture = ? WHERE id = ?";
  await db.execute(query, [imageUrl, userId]);
}

// Export all model functions for use in controllers
module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getUserByUsername,
  getPublicUserByUsername,
  updateProfilePicture,
};
