// src/controller/userController.js

// Import the user model to interact with the database
const userModel = require("../models/userModels");
const cloudinary = require("../config/cloudinary");
const tokenService = require("../utils/tokenService");
const authModel = require("../models/authModels");
const { comparePassword, hashPassword } = require("../utils/hash");

async function updateUser(req, res, next) {
  try {
    // console.log("Update User Request Body:", req.body);
    const userIdToUpdate = parseInt(req.user.id);
    const loggedInUserId = req.user.id; // From verifyToken middleware

    // Authorization Check: Ensure users can only update their own profile
    if (userIdToUpdate !== loggedInUserId) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only update your own profile." });
    }

    // Input Sanitization: Only pick the fields that are safe to change
    const {
      name,
      surname,
      username,
      email,
      phoneNumber,
      birthdate,
      info,
      socials,
      country,
    } = req.body;
    const safeUpdateData = {
      name,
      surname,
      username,
      email,
      phoneNumber,
      birthdate,
      info,
      socials,
      country,
    };

    // Update the database with only the safe data
    const updatedUser = await userModel.updateUser(
      loggedInUserId,
      safeUpdateData
    );

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

// delete user
async function deleteUser(req, res, next) {
  try {
    const UserId = req.user.id;
    const { password } = req.body;

    // Re-authentication: Verify password before deleting
    const user = await authModel.findUserById(UserId);

    await userModel.deleteUser(UserId);

    // Cleanup: Delete any lingering refresh tokens for this user
    await tokenService.deleteAllUserTokens(UserId); // You will need to create this function

    // Clear the cookie and send response
    res
      .clearCookie("refresh_token")
      .status(200)
      .json({ message: "Account deleted successfully." });
  } catch (err) {
    next(err);
  }
}

// get own profile
async function getOwnProfile(req, res, next) {
  try {
    const { username } = req.user;
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// get public user by username
async function getPublicUserByUsername(req, res, next) {
  try {
    const { username } = req.params;
    const user = await userModel.getPublicUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// Upload profile picture
const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const userId = req.user.id;

    const user = await authModel.findUserById(userId);

    if (!user) {
      // Check if user exists before proceeding
      return res.status(404).json({ message: "User not found." });
    }

    const oldImageUrl = user.profilePicture;

    // If the old image URL exists and is from Cloudinary, delete it
    if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
      const folderName = "profile-pictures";
      // Find the position of the folder name in the URL to locate the image path
      // Proceed only if the folder name exists in the URL (i.e., index is not -1)
      const startIndex = oldImageUrl.indexOf(folderName);
      if (startIndex !== -1) {
        // Get the substring from the folder name to the end
        const pathWithExtension = oldImageUrl.substring(startIndex);
        // Remove the file extension (.webp, .jpg, etc.)
        const publicId = pathWithExtension.substring(
          0,
          pathWithExtension.lastIndexOf(".")
        );
        // Use this publicId to delete
        const deleteResult = await cloudinary.uploader.destroy(publicId);
      }
    }

    // Upload the new image to Cloudinary
    const imageUrl = req.file.path;
    await userModel.updateProfilePicture(userId, imageUrl);
    return res.status(200).json({ imageUrl }); // Return the new image URL
  } catch (error) {
    next(error);
  }
};

// Update password
async function updatePassword(req, res, next) {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    // console.log("Update Password Request Body:", req.body);

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required." });
    }

    const user = await authModel.findUserById(userId); // Use authModel to get password

    // This handles users who signed up with Google and may not have a password yet
    if (user.password) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Current password is required." });
      }
      // Use 'user.password' to be consistent with your login controller
      const isMatch = await comparePassword(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect current password." });
      }
    }

    const hashedNewPassword = await hashPassword(newPassword);
    await userModel.updateUserPassword(userId, hashedNewPassword);

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
}


// Export functions
module.exports = {
  updateUser,
  deleteUser,
  getOwnProfile,
  getPublicUserByUsername,
  uploadProfilePicture,
  updatePassword,
};
