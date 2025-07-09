// src/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/auth');
const gameController = require('../controller/gameController');


// router.get('/', verifyToken, gameController.getAllGames);
router.get('/', gameController.getAllGames);
router.get('/navlist', gameController.getGameNavList);
router.get('/:slug', gameController.getGameBySlug);
router.post('/:slug/reviews', verifyToken, gameController.addReview);
router.get('/stats/:gameSlug', verifyToken, gameController.getUserGameStats);
router.get('/leaderboard/global', gameController.getGlobalLeaderboard);
router.get('/leaderboard/:slug', gameController.getGameLeaderboard);

// router.delete('/:slug/reviews', verifyToken, gameController.deleteReview);
router.delete('/reviews/:reviewId', verifyToken, gameController.deleteReview);


module.exports = router;
