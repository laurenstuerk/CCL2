// File: src/controller/authController.js
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");
const {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt");
const tokenService = require("../utils/tokenService");
const { OAuth2Client } = require("google-auth-library");
const authModel = require("../models/authModels");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

// Register a new user
async function register(req, res, next) {
  try {
    const { name, surname, username, email, password } = req.body; // Destructure the request body

    const emailExists = await authModel.findUserByEmail(email); // Check if email already exists
    if (emailExists)
      return res.status(400).json({ message: "Email already in use" }); // If email exists, return error

    const usernameExists = await authModel.findUserByUsername(username); // Check if username already exists
    if (usernameExists)
      return res.status(400).json({ message: "Username already in use" });  // If username exists, return error

    const hashed = await hashPassword(password);  // Hash the password
    const userId = await authModel.createUser({ // Create a new user in the database
      name,
      surname,
      username,
      email,
      password: hashed,
    });

    // If user creation is successful, create a user object
    // So users dont have login after registration
    const user = { id: userId, email, username, role: "user" };

    const accessToken = generateAccessToken(user); // Generate an access token for the user
    const refreshToken = generateRefreshToken(user); // Generate a refresh token for the user
    await tokenService.replaceUserToken(user.id, refreshToken); // Replace any existing refresh token for the user

    // Set the refresh token as a cookie in the response
    // The cookie will be HTTP-only, secure (in production)
    // This prevents client-side scripts from accessing the token, enhancing security
    // The Json response includes the user object and the access token
    // The access token is short-lived(15), while the refresh token is long-lived(7 days)
    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ user: user, accessToken });
  } catch (err) {
    next(err);
  }
}

// Login function for users
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email or password is required" });
    }
    // Find the user by email
    const user = await authModel.findUserByEmail(email);
    
    if (!user) return res.status(401).json({ message: "Invalid credentials" });


    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    // mfa check
    if (user.mfa_enabled) {
      // User has MFA enabled, so we require a token
      // Return a response indicating that MFA is required
      return res.status(200).json({
        mfaRequired: true,
        userId: user.id, // Send the user ID to the frontend
      });
    } // else, proceed with the login

    const userPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      mfa_enabled: user.mfa_enabled,
      hasPassword: !!user.password // Check if the user has a password set but as a boolean(for google auth)
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);
    await tokenService.saveRefreshToken(user.id, refreshToken);
    await tokenService.replaceUserToken(user.id, refreshToken);

    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: userPayload, accessToken });
  } catch (err) {
    next(err);
  }
}

async function googleAuth(req, res, next) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub, picture } = payload;

    let user = await authModel.findUserByEmail(email);

    if (!user) {
      const userId = await authModel.createGoogleUser({
        name: given_name,
        surname: family_name,
        email,
        username: email.split("@")[0],
        profilePicture: picture,
        providerId: sub,
        provider: "google",
      });
      user = await authModel.getUser(userId);
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      mfa_enabled: user.mfa_enabled,
      hasPassword: !!user.password,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // await tokenService.revokeAllUserTokens(user.id);
    // await tokenService.saveRefreshToken(user.id, refreshToken);
    await tokenService.replaceUserToken(user.id, refreshToken);

    res
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: userPayload, // Du hast userPayload schon definiert, nutze es
        accessToken, // Füge den Access Token hinzu
        message: "Logged in with Google",
      });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
}


async function refreshToken(req, res, next) {
  try {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    // With our new logic, we only need to check if the token exists at all.
    const tokenRecord = await tokenService.getTokenRecord(token);
    if (!tokenRecord) {
      // The token is not in the database, so it's invalid or has been rotated.
      return res
        .clearCookie("refresh_token")
        .status(403)
        .json({ message: "Invalid refresh token. Session ended." });
    }
    // Verify the refresh token
    const decoded = verifyRefreshToken(token);
    const user = await authModel.findUserById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      mfa_enabled: user.mfa_enabled,
      hasPassword: !!user.password,
    };

    // Issue the new tokens
    const accessToken = generateAccessToken(userPayload);
    const newRefreshToken = generateRefreshToken(userPayload);
    
    // Replace the old token with the new one
    await tokenService.replaceUserToken(user.id, newRefreshToken);

    // Set the new refresh token as a cookie in the response
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ user: userPayload, accessToken });
  } catch (err) {
    next(err);
  }
}

// Logout function to clear the refresh token in the database and cookie
async function logout(req, res) {
  //clear refresh token from the database
  // console.log(req.user);
  const user_id = req.user.id;
  if (user_id) {
    await tokenService.deleteAllUserTokens(user_id)
      .catch(err => console.error("Error deleting token:", err));
  }
  res.clearCookie("refresh_token").status(200).json({ message: "Logged out" });
}

// Function to set up Multi-Factor Authentication (MFA) for a user
async function setupMfa(req, res, next) {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    // speakeasy is a library for generating and verifying TOTP (Time-based One-Time Password) tokens
    // qrcode is a library for generating QR codes
    // speakeasy generates a secret key for the user
    // This secret key will be used to generate TOTP tokens
    const secret = speakeasy.generateSecret({
      name: `Ripground (${userEmail})`, // This label will appear in the authenticator app 
    });

    // Generate a QR code URL that the user can scan with their authenticator app
    await authModel.updateUserMfaSecret(userId, secret.base32);

    // qrcode.toDataURL generates a QR code image in data URL format
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      if (err) {
        console.error("QR Code Error:", err);
        return res.status(500).json({ message: "Could not generate QR code" });
      }
      // Send the QR URL code  back to the client
      res.status(200).json({
        qrCodeUrl: data_url,
      });
    });
  } catch (err) {
    next(err);
  }
}

// Function to verify the MFA token
async function verifyMfa(req, res, next) {
  const { token } = req.body;
  const userId = req.user.id;
  try {
    // Use the findUserById to get the user
    const user = await authModel.findUserById(userId);

    if (!user || !user.mfa_secret) {
      return res.status(400).json({
        message: "MFA secret not found. Please try setting it up again.",
      });
    }

    // Verify the token using speakeasy
    // speakeasy.totp.verify checks if the provided token is valid for the user's secret
    // The window parameter allows for a small time drift (1 time step, which is 30 seconds)
    const isVerified = speakeasy.totp.verify({
      secret: user.mfa_secret,
      encoding: "base32",
      token: token,
      window: 1, // Allows for a 30-second time drift
    });

    // If the token is verified, we can enable MFA for the user
    if (isVerified) {
      // Token is valid, so permanently enable MFA for the user
      await authModel.enableUserMfa(userId);
      res.status(200).json({ message: "MFA has been successfully enabled!" });
    } else {
      res.status(400).json({ message: "Invalid token. Please try again." });
    }
  } catch (err) {
    next(err);
  }
}

// Function to verify MFA token during login
async function loginVerifyMfa(req, res, next) {
  // This function is called after the user has entered their email and password
  const { userId, token } = req.body;

  try {
    const user = await authModel.findUserById(userId);
    if (!user || !user.mfa_enabled || !user.mfa_secret) {
      return res
        .status(401)
        .json({ message: "Invalid request. User or MFA setup not found." });
    }

    const isVerified = speakeasy.totp.verify({
      secret: user.mfa_secret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (isVerified) {// MFA token is correct, now proceed with the login (just like in the login function after mfa check)
      const userPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        mfa_enabled: user.mfa_enabled,
        hasPassword: !!user.password,
      };

      const accessToken = generateAccessToken(userPayload);
      const refreshToken = generateRefreshToken(userPayload);
      await tokenService.replaceUserToken(user.id, refreshToken);

      res
        .cookie("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user: userPayload, accessToken });
    } else {
      res.status(401).json({ message: "Invalid MFA token." });
    }
  } catch (err) {
    next(err);
  }
}

// Function to disable Multi-Factor Authentication (MFA) for a user
async function disableMfa(req, res, next) {
  const userId = req.user.id;
  try {
    const user = await authModel.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await authModel.disableUserMfa(userId);
    res.status(200).json({ message: "Two-Factor Authentication has been disabled." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  refreshToken,
  logout,
  setupMfa,
  verifyMfa,
  loginVerifyMfa,
  disableMfa,
};
