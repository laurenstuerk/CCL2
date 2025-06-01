//src/models/gameModels.js

const db = require('../config/db');// Import the promise-based MySQL pool from database config

async function insertRaceTime(user_id, time) {
  const [result] = await db.execute(
    "INSERT INTO leaderboard (user_id, time) VALUES (?, ?)",
    [user_id, time]
  );
  return result;
};

module.exports = {
insertRaceTime
};
