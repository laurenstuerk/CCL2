// src/controller/userController.js

// Import the user model to interact with the database
const userModel = require('../models/userModels');


// Function to get user details by ID
async function getUserById(req, res, next) {
    try {
        const user = await userModel.getUser(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500);
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const id = parseInt(req.params.id);
        const userId = req.user.id;
        const userData = req.body;


        if (id !== userId) {
            return res.status(403).json({ message: "Not allowed to update this user." });
        }

        const updatedUser = await userModel.updateUser(token, id, userData);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const userId = req.user.id;

        if (id !== userId) {
            return res.status(403).json({ message: "Not allowed to delete this user." });
        }

        await userModel.deleteUser(id);
        res.status(204).send(); // 204 No Content
    } catch (err) {
        next(err);
    }
}

async function getUserByUsername(req, res, next) {
    try {
        const { username } = req.params;
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function getPublicUserByUsername(req, res, next) {
    try {
        const { username } = req.params;
        const user = await userModel.getPublicUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const userId = req.user.id;
        // Cloudinary automatically stores the file, and multer adds info to req.file
        const imageUrl = req.file.path;
        await userModel.updateProfilePicture(userId, imageUrl);

        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Something went wrong during upload" });
    }
};



// Export functions
module.exports = {
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
    getPublicUserByUsername,
    uploadProfilePicture
};
