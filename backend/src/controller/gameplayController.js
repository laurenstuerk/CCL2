// src/controller/gameController.js

const gameplayModel = require("../models/gameplayModels");
const gameModel = require("../models/gameModels");

// Not implemented yet
async function submitGameResult(req, res) {

const user_id = req.user?.id;
  const { game_slug, time_ms, xp } = req.body;

  if (!user_id || typeof time_ms !== "number") {
    return res.status(400).json({
      error: "user_id and time are required and time must be a number.",
    });
  }

  const game_id = await gameModel.findGameId(game_slug);
  if (!game_id) {
    return res.status(404).json({ error: "Game not found." });
  }

  try {
    const result = await gameplayModel.insertRaceTime(game_id, user_id, time_ms, xp);
    res
      .status(201)
      .json({ message: "Race time_ms recorded", id: result.insertId });
  } catch (error) {
    console.error("Error submitting race time:", error);
    res.status(500).json({ error: "Failed to record race time." });
  }
}

// export module
module.exports = {
  submitGameResult,
};