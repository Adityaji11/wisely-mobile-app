const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/backend/AuthController');

// Define routes

/**
 * This routes are for only developemnt
 */
if (process.env.ENVIRONMENT === "development") {
    router.post('/signin', AuthController.signin);
    router.post('/signup', AuthController.signup);
}

//Login through token
router.get('/tauth', AuthController.tokenAuth);

//Logout from the current session
router.get('/logout', AuthController.logout);

module.exports = router;