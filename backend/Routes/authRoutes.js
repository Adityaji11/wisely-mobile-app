const express = require('express');
const { signup, login, refreshToken ,logout,verifySession ,updateLocation} = require('../Controller/authController');
const { validateSignup, validateLogin, handleValidationErrors  } = require('../middleware/inputValidation');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup',validateSignup, handleValidationErrors,signup);
router.post('/login',validateLogin, handleValidationErrors,login);
router.post('/refresh-token', refreshToken);
router.post('/verify-session', verifySession);
router.post('/update-location', authMiddleware, updateLocation);
router.post('/logout', logout);

module.exports = router;
