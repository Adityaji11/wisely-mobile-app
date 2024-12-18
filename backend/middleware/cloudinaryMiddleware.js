// middleware/upload.js
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const moment = require('moment');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const userId = req.user?.id || 'default_user'; // Ensure `req.user.id` is available
    const dateOfUpload = moment().format('YYYY-MM-DD_HH-mm-ss'); // Format date as desired

    return {
      folder: 'user_profiles', // Cloudinary folder
      allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
      public_id: `${userId}/${dateOfUpload}`, // Custom public_id
    };
  },
});

const upload = multer({storage});

module.exports = upload;
