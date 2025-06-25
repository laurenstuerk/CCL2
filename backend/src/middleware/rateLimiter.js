// src/middleware/rateLimiter.js

// Not implemented yet
// This middleware is used to limit the number of requests a user can make to the authentication endpoints.

const rateLimit = require("express-rate-limit");

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authRateLimiter };
