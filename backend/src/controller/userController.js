// src/controller/userController.js

// Import the user model to interact with the database
const userModel = require('../models/userModels');


// Function to get user details by ID
async function getUserById(req, res, next) {
  try {
    const user = await userModel.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500);
    next(err);
  }
}

// Function to create a new user
async function createUser(req, res, next) {
  try {
    const userData = req.body; // expect JSON with user fields like {name, email, password}
    const newUser = await userModel.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}



// Export functions
module.exports = {
    getUserById,
    createUser,
};
