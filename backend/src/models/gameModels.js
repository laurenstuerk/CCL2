//src/models/gameModels.js

const db = require("../config/db"); // Import the promise-based MySQL pool from database config

// Function to find a game by its slug and include reviews
/**
 * Finds a game by its slug and includes associated reviews.
 * @param {string} slug - The slug of the game to find.
 * @returns {Promise<Array>} - A promise that resolves to an array of game and review objects.
 */
async function findGameBySlugWithReviews(slug) {
  const sql = `
    SELECT 
      g.id as game_id, g.slug, g.title, g.description, g.rating as game_rating, g.tag, g.genre, g.developer, g.release_date, g.logo_url, g.main_image_url, g.video_url, g.play_url, g.thumbnail_images, g.features,
      r.id as review_id, r.user_id, r.username, r.rating as review_rating, r.text, r.helpful, r.created_at as review_created_at
    FROM games g
    LEFT JOIN reviews r ON g.id = r.game_id
    WHERE g.slug = ?;
  `;
  const [rows] = await db.execute(sql, [slug]);
  return rows;
}

async function getLeaderboard(gameId) {
  // This query now joins with the users table to get all required data at once.
  const sql = `
    SELECT 
      u.username,
      u.league,
      u.xp,
      gr.time,
      gr.created_at,
      RANK() OVER (ORDER BY gr.time ASC) as 'rank'
    FROM 
      leaderboard AS gr
    JOIN 
      users AS u ON gr.user_id = u.id
    WHERE 
      gr.game_id = ?
    ORDER BY 
      gr.time ASC
  `;
  
  const [rows] = await db.execute(sql, [gameId]);
  return rows;
}

// Function to get all games from the database
async function getAllGames() {
  // console.log("Models: Fetching all games from the database");
  try {
    const sql = `
      SELECT 
        id, slug, title, description, rating, tag, genre, developer, release_date, logo_url, main_image_url, video_url, play_url, thumbnail_images, features, featured
      FROM games;
    `;
    const [rows] = await db.execute(sql);
    // console.log("Models: Fetched all games:", rows);
    return rows;
  } catch (error) {
    console.error("Models: Error fetching all games:", error);
    throw error;
  }
}

// create review for a game
/**
 * Creates a new review for a game.
 * @param {number} gameId - The ID of the game being reviewed.
 * @param {number} userId - The ID of the user creating the review.
 * @param {string} username - The username of the user creating the review.
 * @param {number} rating - The rating given by the user (1-5).
 * @param {string} text - The text content of the review.
 * @returns {Promise<Object>} - A promise that resolves to the newly created review object.
 */
async function createReview(gameId, userId, username, rating, text) {
  const sql = `
    INSERT INTO reviews (game_id, user_id, username, rating, text)
    VALUES (?, ?, ?, ?, ?);
  `;
  const [result] = await db.execute(sql, [
    gameId,
    userId,
    username,
    rating,
    text,
  ]);

  const [newReview] = await db.execute("SELECT * FROM reviews WHERE id = ?", [
    result.insertId,
  ]);
  return newReview[0];
}

// Function to get navigation links for games
async function getGameNavLinks() {
  const sql = `SELECT title, slug FROM games ORDER BY title ASC`;
  const [rows] = await db.execute(sql);
  return rows;
}

async function getGlobalXpLeaderboard(limit = 12) {
  const sql = `SELECT xp, username, league, created_at FROM users ORDER BY xp DESC`;
  const [rows] = await db.execute(sql);
  return rows;
}

async function findGameId(slug) {
  // console.log("Models: Finding game ID for slug:", slug);
  const sql = `SELECT id FROM games WHERE slug = ?`;
  const [rows] = await db.execute(sql, [slug]);
  return rows[0].id;
}

async function deleteReviewById(reviewId) {
  const sql = `DELETE FROM reviews WHERE id = ?`;
  const [result] = await db.execute(sql, [reviewId]);
  return result;
}

async function findReviewById(reviewId) {
  const sql = `SELECT * FROM reviews WHERE id = ? LIMIT 1`;
  const [rows] = await db.execute(sql, [reviewId]);
  return rows[0]; // Returns the review object or undefined
}

async function fetchUserStatsForGame(userId, gameId) {
  const sql = `
    SELECT
      COUNT(*) AS timesPlayed,
      SUM(time) AS totalPlayTimeMs,
      MIN(time) AS bestTimeMs
    FROM 
      leaderboard
    WHERE 
      user_id = ? AND game_id = ?;
  `;
  const [rows] = await db.execute(sql, [userId, gameId]);
  const stats = rows[0];

  const reviewSql = `SELECT COUNT(*) as reviewCount FROM reviews WHERE user_id = ? AND game_id = ?;`;
  const [reviewRows] = await db.execute(reviewSql, [userId, gameId]);
  const review = reviewRows[0]

  // This query always returns exactly one row.
  return {
    stats,
    review,
  }
}

module.exports = {
  findGameBySlugWithReviews,
  createReview,
  getAllGames,
  getGameNavLinks,
  getGlobalXpLeaderboard,
  getLeaderboard,
  findGameId,
  deleteReviewById,
  findReviewById,
  fetchUserStatsForGame
};
