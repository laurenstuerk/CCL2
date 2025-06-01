// src/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const gameController = require('../controller/gameController');


// Optional: Add verifyToken middleware
router.post("/marble", gameController.submitRaceTime);

module.exports = router;
