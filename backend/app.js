// backend/app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require('./src/routes/authRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5174', // or your deployed frontend domain
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your Express.js MySQL application backend!" });
});

module.exports = app;
