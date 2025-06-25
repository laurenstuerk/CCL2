//src/utils/tokenService.js

const db = require("../config/db");
const { REFRESH_TOKEN_EXPIRES_SEC } = require("./jwt");

// This module saves the refresh token
async function saveRefreshToken(userId, token) {
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_SEC * 1000); // Calculate expiration date
  // Insert the refresh token into the database
  await db.execute(
    `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
    [userId, token, expiresAt]
  );
}

async function getTokenRecord(token) {
  const [rows] = await db.execute(
    `SELECT * FROM refresh_tokens WHERE token = ? LIMIT 1`,
    [token]
  );
  return rows[0];
}

// This function replaces the user's refresh token with a new one
async function replaceUserToken(userId, token) {

  try {
    // Delete all previous refresh tokens for this user
    await db.execute(`DELETE FROM refresh_tokens WHERE user_id = ?`, [userId]);
    
    // Insert the new refresh token
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES_SEC * 1000);
    await db.execute(
      `INSERT INTO refresh_tokens (user_id, token, expires_at, is_revoked) VALUES (?, ?, ?, FALSE)`,
      [userId, token, expiresAt]
    );

  } catch (error) {
    console.error("Failed to replace refresh token:", error);
    throw error;
  }
}

// clean up all refresh tokens for a user
async function deleteAllUserTokens(userId) {
  await db.execute(`DELETE FROM refresh_tokens WHERE user_id = ?`, [userId]);
}

module.exports = {
  saveRefreshToken,
  getTokenRecord,
  replaceUserToken,
  deleteAllUserTokens
};
