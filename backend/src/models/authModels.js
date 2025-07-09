// src/models/authModels.js
const db = require("../config/db");

async function createUser({ name, surname, username, email, password }) {
  const [result] = await db.execute(
    "INSERT INTO users (name, surname, username, email, password, role, league, xp) VALUES (?, ?, ?, ?, ?, 'user', 'bronze', 0)",
    [name, surname, username, email, password]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

async function findUserByUsername(username) {
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return rows[0];
}

// in src/models/authModels.js

async function findUserById(id) {
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0];
}

async function createGoogleUser({
  name,
  surname,
  email,
  username,
  profilePicture,
  providerId,
  provider,
  league
}) {
  const [result] = await db.execute(
    `INSERT INTO users (name, surname, email, username, profilePicture, provider_id, provider, league) 
     VALUES (?, ?, ?, ?, ?, ?, ?, Bronze)`,
    [
      name || null,
      surname || null,
      email,
      username,
      profilePicture,
      providerId,
      provider,
      league
    ]
  );
  return result.insertId;
}

async function updateUserMfaSecret(userId, secret) {
  try {
    const sql = "UPDATE users SET mfa_secret = ? WHERE id = ?";
    await db.query(sql, [secret, userId]);
  } catch (error) {
    console.error("Error updating MFA secret:", error);
    throw error;
  }
}

async function enableUserMfa(userId) {
  try {
    const sql = "UPDATE users SET mfa_enabled = TRUE WHERE id = ?";
    await db.query(sql, [userId]);
  } catch (error) {
    console.error("Error enabling MFA:", error);
    throw error;
  }
}

async function disableUserMfa(userId) {
  const sql = "UPDATE users SET mfa_enabled = FALSE, mfa_secret = NULL WHERE id = ?";
  await db.query(sql, [userId]);
  return true;
}

module.exports = {
  findUserByEmail,
  createGoogleUser,
  createUser,
  findUserByUsername,
  findUserById,
  updateUserMfaSecret,
  enableUserMfa,
  disableUserMfa
};
