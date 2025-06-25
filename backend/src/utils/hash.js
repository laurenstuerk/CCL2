const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// This module provides functions to hash and compare passwords using bcrypt.


async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
