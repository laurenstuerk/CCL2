// src/controller/gameController.js

const gameModel = require("../models/gameModels");

exports.submitRaceTime = async (req, res) => {
  const { user_id, time } = req.body;
  console.log(req.body);

  if (!user_id || typeof time !== "number") {
    return res.status(400).json({ error: "user_id and time are required and time must be a number." });
  }

  try {
    const result = await gameModel.insertRaceTime(user_id, time);
    res.status(201).json({ message: "Race time recorded", id: result.insertId });
  } catch (error) {
    console.error("Error submitting race time:", error);
    res.status(500).json({ error: "Failed to record race time." });
  }
};
