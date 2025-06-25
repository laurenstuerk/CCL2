// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/auth');
const upload = require("../middleware/upload");


// router.get("/id/:id", verifyToken, userController.getUserById);// Get user by ID
router.get("/me", verifyToken, userController.getOwnProfile);// Get me profile
router.get("/public/:username", verifyToken, userController.getPublicUserByUsername); // Get public user by username
router.post("/upload", verifyToken, upload.single("image"), userController.uploadProfilePicture);// Upload profile picture
router.put("/update", verifyToken, userController.updateUser);// Update and delete user
router.put('/password', verifyToken, userController.updatePassword);// Update user password

router.delete("/delete", verifyToken, userController.deleteUser); // Delete user

// router.post('/mfa/toggle', verifyToken, userController.toggleMfa);

module.exports = router;
