// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

module.exports = router;
