// backend/app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const { OAuth2Client } = require("google-auth-library");
const path = require("path");

// Import API routes
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const gameRoutes = require('./src/routes/gameRoutes');
const gameplayRoutes = require('./src/routes/gameplayRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (req.path.startsWith('/godot-game')) {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
  }
  next();
});


// Routes
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/gameplay', gameplayRoutes);

app.use(
  "/godot-game",
  express.static(path.join(__dirname, "../frontend/dist/godot-game"))
);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

module.exports = app;