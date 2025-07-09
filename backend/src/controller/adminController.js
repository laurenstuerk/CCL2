//controller/adminController.js

const adminModel = require('../models/adminModels');
const userModel = require('../models/userModels');

// This function retrieves all users with pagination, sorting, and searching capabilities.
async function getAllUsers(req, res, next) {
  try {
    // Extract query parameters for pagination, sorting, and searching from the request
    const options = {
      page: parseInt(req.query.page, 10) || 1,  // for pagination
      limit: parseInt(req.query.limit, 10) || 15, //limit of users per page
      sortBy: req.query.sortBy || 'id',    // standart is 'id'
      order: req.query.order || 'desc',   // order can be 'asc' or 'desc'
      search: req.query.search || '',    // search term
    };
    // Validate the page and limit values
    const offset = (options.page - 1) * options.limit;

    // Get all users with the specified options
    const [users, totalRows] = await Promise.all([
      adminModel.findAndPaginateUsers({ ...options, offset }),
      adminModel.countTotalUsers({ ...options })
    ]);

    // calculate total pages based on the total number of rows and the limit
    const totalPages = Math.ceil(totalRows / options.limit);

    //send the response with the users data and pagination info in JSON format
    res.status(200).json({
      data: users,
      pagination: {
        currentPage: options.page,
        rowsPerPage: options.limit,
        totalPages,
        totalRows,
      },
    });
  } catch (error) {
    next(error);
  }
}
async function updateUserByAdmin(req, res, next) {
  try {
    const { id } = req.params;
    // Only allow updating specific, safe fields
    const { role, name, surname, username, email } = req.body;
    const safeUpdateData = { role, name, surname, username, email };

    await adminModel.updateUserById(id, safeUpdateData);
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    next(error);
  }
};

// This function deletes a user by their ID.
async function deleteUserById(req, res, next) {
  try {
    const { userId } = req.params;
    // You would also delete related data here, e.g., refresh tokens
    await adminModel.deleteUserById(userId);
    res.status(204).send(); // Success, no content
  } catch (error) {
    next(error);
  }
};

async function getGameHistory(req, res, next) {
  try {
    // Extract query parameters with safe defaults
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      sortBy: req.query.sortBy || 'id',
      order: req.query.order === 'asc' ? 'ASC' : 'DESC',
      username: req.query.username || '',
    };

    const result = await adminModel.fetchPaginatedGameHistory(options);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

async function deleteGameHistoryEntry(req, res, next) {
  try {
    const { id } = req.params;
    await adminModel.deleteHistoryById(id);
    res.status(204).send(); // Success, no content to return
  } catch (error) {
    next(error);
  }
};

async function getGeneralStats(req, res, next) {
  try {
    const stats = await adminModel.fetchGeneralDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  deleteGameHistoryEntry,
  getGameHistory,
  getGeneralStats,
  updateUserByAdmin,
  deleteUserById
};