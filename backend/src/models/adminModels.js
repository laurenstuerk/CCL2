// src/models/adminModels.js

const bcrypt = require("bcrypt");// Import bcrypt to securely hash and compare passwords
const db = require('../config/db');// Import the promise-based MySQL pool from database config

// Get all users
async function getAllUsers() {
  const [rows] = await db.execute('SELECT id, name, surname, username, email, role FROM users');
  return rows;
}

async function updateUserById(userId, userData) {
  // This dynamically builds the SET part of the query safely
  const fields = Object.keys(userData).filter(key => userData[key] !== undefined);
  const setClauses = fields.map(field => `${field} = ?`).join(', ');
  const values = fields.map(key => userData[key]);

  if (fields.length === 0) {
    throw new Error("No fields to update.");
  }

  const sql = `UPDATE users SET ${setClauses} WHERE id = ?`;
  await db.execute(sql, [...values, userId]);
}

async function deleteUserById(userId) {
  const sql = `DELETE FROM users WHERE id = ?`;
  await db.execute(sql, [userId]);
}

// Sicherheits-Whitelist für Spalten, nach denen sortiert werden darf
const allowedSortColumns = ['id', 'name', 'email', 'role', 'joinedDate'];

// Hilfsfunktion, um die WHERE-Klausel für die Suche sicher zu bauen
const buildWhereClause = (search) => {
  let whereClause = '';
  const params = [];
  if (search) {
    whereClause = 'WHERE name LIKE ? OR email LIKE ? OR username LIKE ?';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }
  return { whereClause, params };
};

// Hauptfunktion zum Holen der paginierten und gefilterten Benutzer
async function findAndPaginateUsers(options) {
  const { limit, offset, sortBy, order, search } = options;

  // 1. Rigorose Validierung der Eingabewerte
  if (!allowedSortColumns.includes(sortBy)) {
    throw new Error('Ungültige Sortierspalte.');
  }
  const safeOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const numLimit = parseInt(limit, 10);
  const numOffset = parseInt(offset, 10);

  if (isNaN(numLimit) || isNaN(numOffset) || numLimit <= 0 || numOffset < 0) {
    throw new Error('Ungültige Paginierungs-Argumente.');
  }

  // 2. WHERE-Klausel und ihre Parameter separat erstellen
  const { whereClause, params: whereParams } = buildWhereClause(search);

  // 3. Finalen SQL-String sicher zusammenbauen
  const sql = `
    SELECT 
      u.id, 
      u.name, 
      u.surname, 
      u.username, 
      u.email, 
      u.role, 
      u.created_at as joinedDate, 
      u.profilePicture,
      EXISTS (
        SELECT 1 
        FROM refresh_tokens rt 
        WHERE rt.user_id = u.id AND rt.is_revoked = FALSE AND rt.expires_at > NOW()
      ) AS isActive
    FROM 
      users u
    ${whereClause}
    ORDER BY ${sortBy} ${safeOrder}
    LIMIT ${numLimit}
    OFFSET ${numOffset};
  `;

  // 4. Abfrage nur mit den Parametern für die WHERE-Klausel ausführen
  const [users] = await db.execute(sql, whereParams);
  return users;
}

async function countTotalUsers(options) {
  const { search } = options;
  const { whereClause, params } = buildWhereClause(search);
  const sql = `SELECT COUNT(*) as total FROM users ${whereClause};`;
  const [result] = await db.execute(sql, params);
  return result[0].total;
}

async function deleteHistoryById(id) {
  const sql = `DELETE FROM leaderboard WHERE id = ?`;
  await db.execute(sql, [id]);
}

async function fetchPaginatedGameHistory(options) {
  const { page, limit, sortBy, order, username } = options;
  const offset = (page - 1) * limit;

  // A list of columns that are safe to sort by to prevent SQL injection
  const safeSortColumns = ['id', 'username', 'game_title', 'time', 'created_at'];
  const safeSortBy = safeSortColumns.includes(sortBy) ? sortBy : 'id';

  let whereClauses = [];
  let queryParams = [];

  if (username) {
    whereClauses.push(`u.username LIKE ?`);
    queryParams.push(`%${username}%`);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  // First query: Get the total count of entries for pagination
  const countSql = `
        SELECT COUNT(*) as totalEntries 
        FROM leaderboard gr
        JOIN users u ON gr.user_id = u.id
        ${whereSql};
    `;
  const [countRows] = await db.execute(countSql, queryParams);
  const totalEntries = countRows[0].totalEntries;

  // Second query: Get the actual data for the current page
  const dataSql = `
        SELECT 
            gr.id,
            u.username,
            g.title as game_title,
            gr.time,
            gr.created_at
        FROM leaderboard gr
        JOIN users u ON gr.user_id = u.id
        JOIN games g ON gr.game_id = g.id
        ${whereSql}
        ORDER BY ${safeSortBy} ${order}
    `;

  // Add pagination params for the final query
  const finalQueryParams = [...queryParams, limit, offset];
  // console.log("Executing SQL:", dataSql);
  // console.log("with params:", finalQueryParams);

  const [data] = await db.execute(dataSql, finalQueryParams);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalEntries / limit),
      totalEntries,
    }
  };
}

async function fetchGeneralDashboardStats() {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS totalUsers,
      (SELECT COUNT(DISTINCT user_id) FROM refresh_tokens WHERE is_revoked = FALSE AND expires_at > NOW()) AS activeUsers,
      (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURRENT_DATE()) AS recentSignups;
  `;
  const [rows] = await db.execute(sql);
  // The query returns an array with a single object: [{ totalUsers: 50, ... }]
  return rows[0];
}


module.exports = {
  getAllUsers,
  findAndPaginateUsers,
  countTotalUsers,
  deleteHistoryById,
  fetchPaginatedGameHistory,
  fetchGeneralDashboardStats,
  updateUserById,
  deleteUserById,
};
