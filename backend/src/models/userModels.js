// src/models/userModels.js
const db = require("../config/db"); // Import the promise-based MySQL pool from database config

async function findUserById(id) {
  const sql = `
    SELECT 
      id, name, surname, email, username, role, provider, profilePicture, rank, info, socials,
      (password IS NOT NULL) as hasPassword 
    FROM users 
    WHERE id = ? LIMIT 1;
  `;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
}

async function getUserByUsername(username) {
  const [rows] = await db.execute(
    "SELECT id, name, surname, username, phoneNumber, email, role, info, league, profilePicture, socials, country, phoneNumber, xp, created_at FROM users WHERE username = ?",
    [username]
  );
  return rows[0]; // return user or undefined
}

async function getPublicUserByUsername(username) {
  const [rows] = await db.execute(
    "SELECT id, name, surname, username, phoneNumber, email, role, info, league, profilePicture, socials FROM users WHERE username = ?",
    [username]
  );
  return rows[0]; // return user or undefined
}

async function updateUser(id, userData = {}) {
  const {
    name,
    surname,
    username,
    phoneNumber,
    email,
    country,
    birthdate,
    info,
    socials,
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
      info = ?,
      socials = ?
  `;

  const params = [
    name || null,
    surname || null,
    username || null,
    phoneNumber || null,
    email || null,
    country || null,
    birthdate || null,
    info || null,
    socials || null
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
    socials,
  };
}

async function updateUserPassword(userId, hashedPassword) {
  const sql = `UPDATE users SET password = ? WHERE id = ?;`;
  const [result] = await db.execute(sql, [hashedPassword, userId]);
  return result;
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
  findUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
  getPublicUserByUsername,
  updateProfilePicture,
  updateUserPassword,
};
