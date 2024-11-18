const User = require('../Model/userModel');
const jwtHelper = require('../utils/jwtHelper');
const Response = require('../utils/response');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');

exports.signup = async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json(Response.error('Email already exists'));
    }

    const user = new User({firstName, lastName, email, password});
    await user.save();

    res.status(201).json(Response.success('User registered successfully', {}));
  } catch (err) {
    res.status(500).json(Response.error('Something went wrong', err));
  }
};

// Login
exports.login = (req, res, next) => {
  passport.authenticate('local', {session: false}, async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(Response.error(info.message));

    try {
      const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(
        {id: user._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'},
      );

      user.refreshToken = refreshToken; // Save refresh token in the database
      await user.save();
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(200).json(Response.success('Login successful', {accessToken}));
      // res.status(200).json(Response.success('Login successful', {}));
    } catch (err) {
      res.status(500).json(Response.error('Something went wrong', err));
    }
  })(req, res, next);
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    // const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken; // Extract from cookies

    if (!refreshToken) {
      return res.status(401).json(Response.error('Refresh token is required'));
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json(Response.error('Unauthorized'));
    }

    const newAccessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
    return res
      .status(200)
      .json(
        Response.success('Access token refreshed', {
          accessToken: newAccessToken,
        }),
      );
  } catch (err) {
    return res.status(401).json(Response.error('Unauthorized', err));
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json(Response.error('Refresh token is required'));
    }

    const user = await User.findOne({refreshToken});
    if (!user) {
      return res.status(400).json(Response.error('Invalid token'));
    }

    user.refreshToken = null; // Revoke refresh token
    await user.save();

    res.clearCookie('refreshToken'); // Clear the cookie
    res.status(200).json(Response.success('Logout successful'));
  } catch (err) {
    res.status(500).json(Response.error('Something went wrong', err));
  }
};

exports.verifySession = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({message: 'Unauthorized'});

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: 'Invalid or expired token'});

    res.status(200).json({user});
  });
};
