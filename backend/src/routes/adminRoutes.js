// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const adminController = require('../controller/adminController');

// Admin routes - all require admin role
router.get('/users', verifyToken, requireRole('admin'), adminController.getAllUsers);

router.patch('/users/:userId/role', verifyToken, requireRole('admin'), adminController.updateUserRole);
router.delete('/users/:userId', verifyToken, requireRole('admin'), adminController.deleteUser);

module.exports = router;
