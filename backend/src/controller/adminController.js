//controller/adminController.js

const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModels');
const userModel = require('../models/userModels');

async function getAllUsers(req, res, next) {
  try {
    const users = await adminModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function updateUserRole(req, res, next) {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await adminModel.updateUserRole(userId, role);
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { userId } = req.params;
    await userModel.deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  updateUserRole,
  deleteUser
};