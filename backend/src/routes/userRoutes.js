// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/auth');
const upload = require("../middleware/upload");

// Get user by ID
router.get("/id/:id", verifyToken, userController.getUserById);

// Upload profile picture
router.post("/upload", verifyToken, upload.single("image"), userController.uploadProfilePicture);

// Get user by username
router.get("/:username", verifyToken, userController.getUserByUsername);
router.get("/public/:username", verifyToken, userController.getPublicUserByUsername);

// Update and delete user
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);



module.exports = router;
