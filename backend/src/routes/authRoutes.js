// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);
router.post('/refresh', authController.refreshToken);
router.post('/logout',verifyToken, authController.logout);

// --- MFA Routes ---
// Route to start the MFA setup process (generates QR code)
router.post('/mfa/setup', verifyToken, authController.setupMfa);// 'protect' ensures only a logged-in user can set up MFA.
router.post('/mfa/verify', verifyToken, authController.verifyMfa);// Route to verify the first token and enable MFA
router.post('/mfa/login-verify', authController.loginVerifyMfa);// Route to verify the MFA token during the login process
// Route to disable MFA
router.post('/mfa/disable', verifyToken, authController.disableMfa);

module.exports = router;
