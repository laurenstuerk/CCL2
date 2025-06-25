// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const adminController = require('../controller/adminController');

// Admin routes - all require admin role
router.get('/users', verifyToken, requireRole('admin'), adminController.getAllUsers);

router.delete('/users/:userId', verifyToken, requireRole('admin'), adminController.deleteUserById);
router.put('/users/:id',verifyToken, requireRole('admin'), adminController.updateUserByAdmin);

router.get('/game-history',verifyToken, requireRole('admin'), adminController.getGameHistory);
router.delete('/game-history/:id',verifyToken, requireRole('admin'), adminController.deleteGameHistoryEntry);

router.get('/stats/general', verifyToken, requireRole('admin'), adminController.getGeneralStats);

module.exports = router;
