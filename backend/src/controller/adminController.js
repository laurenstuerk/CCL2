const bcrypt = require('bcrypt');
const userModel = require('../models/adminModels');


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

module.exports = {
  createUser,
};