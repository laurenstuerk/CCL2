// src/models/adminModels.js

const bcrypt = require("bcrypt");// Import bcrypt to securely hash and compare passwords
const db = require('../config/db');// Import the promise-based MySQL pool from database config

// Get all users
async function getAllUsers() {
  const [rows] = await db.execute('SELECT id, name, surname, username, email, role FROM users');
  return rows;
}

// Update user role
async function updateUserRole(userId, role) {
  await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
}

module.exports = {
  getAllUsers,
  updateUserRole
};
