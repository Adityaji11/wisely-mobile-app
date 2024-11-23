// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_profiles', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // File types allowed
  },
});

const upload = multer({ storage });

module.exports = upload;
