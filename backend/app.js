// backend/app.js

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import routes
const userRoutes = require("./src/routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your Express.js MySQL application backend!" });
});

module.exports = app;
