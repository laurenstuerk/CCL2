// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get("/:id", userController.getUserById);

module.exports = router;
