// src/middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile-pictures", // Folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 400, height: 400, gravity: 'auto', crop: 'auto', aspect_ratio: 1, quality: 'auto', format: 'auto' }],
    options: { use_filename: false }, // Use original filename
  },
});

const upload = multer({ storage });

module.exports = upload;
