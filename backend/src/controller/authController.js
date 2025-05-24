// File: src/controller/authController.js

const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

async function register(req, res, next) {
  try {
    const { name, surname, username, email, password } = req.body;

    // Check if email already exists
    const [emailUsers] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (emailUsers.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Check if username already exists
    const [usernameUsers] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (usernameUsers.length > 0) {
      return res.status(400).json({ message: 'Username already in use' });
    }

    const hashed = await hashPassword(password);

    const [result] = await db.execute(
      'INSERT INTO users (name, surname, username, email, password) VALUES (?, ?, ?, ?, ?)',
      [name, surname, username, email, hashed]
    );

    // Optionally return new user id or info
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token (you can put user id and email inside)
    const token = generateToken({ id: user.id, email: user.email, role: user.role, username: user.username });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
