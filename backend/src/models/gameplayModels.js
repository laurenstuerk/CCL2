const db = require("../config/db");

async function insertRaceTime(game_id, user_id, time, xpEarned) {
  // Insert time into leaderboard
  const [result] = await db.execute(
    "INSERT INTO leaderboard (game_id, user_id, time) VALUES (?, ?, ?)",
    [game_id, user_id, time]
  );

  // Update user's total XP
  await db.execute("UPDATE users SET xp = xp + ? WHERE id = ?", [
    xpEarned,
    user_id,
  ]);
  return result;
}

module.exports = {
  insertRaceTime,
};
