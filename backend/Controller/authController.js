const User = require('../Model/userModel');
const jwtHelper = require('../utils/jwtHelper');
const Response = require('../utils/response');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');

// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// exports.signup = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json(Response.error('Email already exists'));
//     }

//     const user = new User({ firstName, lastName, email, password });
//     await user.save();

//     const accessToken = jwtHelper.generateAccessToken(user);
//     const refreshToken = jwtHelper.generateRefreshToken(user);

//     user.refreshToken = refreshToken;
//     await user.save();

//     res.status(201).json(Response.success('User registered successfully', { accessToken, refreshToken }));
//   } catch (err) {
//     res.status(500).json(Response.error('Something went wrong', err));
//   }
// };

// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// exports.login = async (req, res, next) => {
//   passport.authenticate('local', { session: false }, async (err, user, info) => {
//     if (err) return next(err);
//     if (!user) return res.status(401).json(Response.error(info.message));

//     try {
//       const accessToken = jwtHelper.generateAccessToken(user);
//       const refreshToken = jwtHelper.generateRefreshToken(user);

//       user.refreshToken = refreshToken;
//       await user.save();

//       res.status(200).json(Response.success('Login successful', { accessToken, refreshToken }));
//     } catch (err) {
//       res.status(500).json(Response.error('Something went wrong', err));
//     }
//   })(req, res, next);
// };

// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// exports.refreshToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(401).json(Response.error('Refresh token is required'));
//     }

//     // Verify refresh token
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//     // Check if the user exists
//     const user = await User.findById(decoded.id);
//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(401).json(Response.error('Unauthorized'));
//     }

//     // Generate a new access token
//     const accessToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     return res.status(200).json(Response.success('Access token refreshed', { accessToken }));
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json(Response.error('Unauthorized', err));
//   }
// };
// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  * @returns 
//  */
// exports.logout = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json(Response.error('Refresh token is required'));
//     }

//     const user = await User.findOne({ refreshToken });
//     if (!user) {
//       return res.status(400).json(Response.error('Invalid token'));
//     }

//     user.refreshToken = null; // Revoke the refresh token
//     await user.save();

//     res.status(200).json(Response.success('Logout successful'));
//   } catch (err) {
//     res.status(500).json(Response.error('Something went wrong', err));
//   }
// };
// Signup



exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(Response.error('Email already exists'));
    }

    const user = new User({ firstName, lastName, email, password });
    await user.save();

    res.status(201).json(Response.success('User registered successfully', {}));
  } catch (err) {
    res.status(500).json(Response.error('Something went wrong', err));
  }
};

// Login
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(Response.error(info.message));

    try {
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      user.refreshToken = refreshToken; // Save refresh token in the database
      await user.save();

      res.status(200).json(Response.success('Login successful', {}));
    } catch (err) {
      res.status(500).json(Response.error('Something went wrong', err));
    }
  })(req, res, next);
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json(Response.error('Refresh token is required'));
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json(Response.error('Unauthorized'));
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    return res.status(200).json(Response.success('Access token refreshed', { accessToken: newAccessToken }));
  } catch (err) {
    return res.status(401).json(Response.error('Unauthorized', err));
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json(Response.error('Refresh token is required'));
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(400).json(Response.error('Invalid token'));
    }

    user.refreshToken = null; // Revoke refresh token
    await user.save();

    res.status(200).json(Response.success('Logout successful'));
  } catch (err) {
    res.status(500).json(Response.error('Something went wrong', err));
  }
};