// src/routes/gameplayRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const gameplayController = require('../controller/gameplayController');


router.post("/submitGameResult", verifyToken, gameplayController.submitGameResult);

module.exports = router;