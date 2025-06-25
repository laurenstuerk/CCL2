// src/controller/gameController.js

const gameModel = require("../models/gameModels");

// Function to structure game data from the database rows
const structureGameData = (rows) => {
  if (rows.length === 0) {
    return null;
  }

// creates a gameDetails object
  const gameDetails = {
    id: rows[0].game_id,
    slug: rows[0].slug,
    title: rows[0].title,
    description: rows[0].description,
    rating: rows[0].game_rating,
    tag: rows[0].tag,
    genre: rows[0].genre,
    developer: rows[0].developer,
    releaseDate: rows[0].release_date,
    logo: rows[0].logo_url,
    mainImage: rows[0].main_image_url,
    videoUrl: rows[0].video_url,
    playUrl: rows[0].play_url,
    thumbnailImages: rows[0].thumbnail_images,
    features: rows[0].features,
    reviews: [],
  };

  // goes through all rows to collect reviews
  rows.forEach((row) => {
    if (row.review_id) {
      // pushes review data into the reviews array
      gameDetails.reviews.push({
        id: row.review_id,
        user_id: row.user_id,
        username: row.username,
        rating: row.review_rating,
        text: row.text,
        helpful: row.helpful,
        date: row.review_created_at,
      });
    }
  });

  return gameDetails;
};

// Retrieves a game by its slug, with its reviews
async function getGameBySlug(req, res, next) {
  try {
    const slug = req.params.slug;
    const gameDataRows = await gameModel.findGameBySlugWithReviews(slug);

    if (!gameDataRows || gameDataRows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    // structures the game data with the structureGameData function
    const structuredData = structureGameData(gameDataRows);

    res.status(200).json(structuredData);
  } catch (error) {
    next(error);
  }
}

// Retrieves all games from the database
async function getAllGames(req, res, next) {
  try {
    const games = await gameModel.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}

// Adds a review for a game
async function addReview(req, res, next) {
  try {
    const { slug } = req.params;
    const { rating, text } = req.body;

    const { id: userId, username } = req.user;

    // find the game by slug to now which game to add the review
    const game = await findGameBySlug(slug);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    // Create the review in the database
    const newReview = await gameModel.createReview(
      game.id,
      userId,
      username,
      rating,
      text
    );

    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
}

// Finds a game by its slug and structures the data
async function findGameBySlug(slug) {
  try {
    const game = await gameModel.findGameBySlugWithReviews(slug);
    if (!game || game.length === 0) {
      throw new Error("Game not found");
    }
    return structureGameData(game);
  } catch (error) {
    throw new Error(
      error.message || "Error occurred while fetching game by slug."
    );
  }
}

// gets a list of game navigation links for the Navbar
async function getGameNavList(req, res, next) {
    try {
        const navList = await gameModel.getGameNavLinks();
        res.status(200).json(navList);
    } catch (error) {
        next(error);
    }
}

async function getGlobalLeaderboard(req, res, next){
    try {
        // You'll create this new model function in userModels.js
        const leaderboard = await gameModel.getGlobalXpLeaderboard();
        res.status(200).json(leaderboard);
    } catch (error) {
        next(error);
    }
};

async function getGameLeaderboard (req, res, next) {
    try {
      // console.log(req.params);
    const { slug } = req.params;
        console.log(slug);
        const game = await findGameBySlug(slug);

        if (!game) {
            return res.status(404).json({ message: "Game not found." });
        }

        // reuse the existing model function from gameplayModels.js
        // The second argument 'time' tells it to order by lowest time first.
        // console.log("Controller: Fetching leaderboard for game:", game.id);
        const leaderboard = await gameModel.getLeaderboard(game.id);
        // console.log(leaderboard)
        res.status(200).json(leaderboard);
    } catch (error) {
        next(error);
    }
};

async function deleteReview(req, res, next) {
  try {
    const { reviewId } = req.params;
    const { id: userId, role } = req.user; // From verifyToken middleware

    // 1. Get the review to check ownership
    const review = await gameModel.findReviewById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // 2. Security Check: User must own the review or be an admin
    if (review.user_id !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: You can only delete your own reviews." });
    }

    // 3. If authorized, delete the review
    await gameModel.deleteReviewById(reviewId);

    res.status(204).send(); // Success, no content to return
  } catch (error) {
    next(error);
  }
}

async function getUserGameStats(req, res, next) {
    try {
        const { gameSlug } = req.params;
        const userId = req.user.id; // From verifyToken middleware

        // const game = await gameModel.findGameBySlug(gameSlug);
        // if (!game) {
        //     return res.status(404).json({ message: "Game not found." });
        // }
        
        const stats = await gameModel.fetchUserStatsForGame(userId, 1);
        res.status(200).json(stats);

    } catch (error) {
        next(error);
    }
};



module.exports = {
  getGameBySlug,
  addReview,
  findGameBySlug,
  getAllGames,
  getGameNavList,
  getGlobalLeaderboard,
  getGameLeaderboard,
  deleteReview,
  getUserGameStats
};
