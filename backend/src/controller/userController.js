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

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const userData = req.body;
    const updatedUser = await userModel.updateUser(id, userData);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    await userModel.deleteUser(id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
}


// Export functions
module.exports = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
