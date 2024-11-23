const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/cloudinaryMiddleware');
const { userProfile, Users } = require('../Controller/userProfileController');


const router = express.Router();

router.post('/',authMiddleware, upload.single('profileImage') ,userProfile);
router.get('/',authMiddleware,Users);


module.exports = router;
