// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get("/:id",authenticateToken, userController.getUserById);
router.put("/:id",authenticateToken, userController.updateUser);
router.delete("/:id",authenticateToken, userController.deleteUser);

module.exports = router;
