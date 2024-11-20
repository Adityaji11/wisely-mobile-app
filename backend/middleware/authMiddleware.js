const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; // Get refreshToken from cookies

  if (!refreshToken) {
    return res
      .status(401)
      .json({error: 'Unauthorized: Refresh token not found'});
  }

  try {
    // Verify the token using the correct secret
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    req.user = {id: decoded.id}; // Attach the decoded user ID to req.user
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message); // Log detailed error for debugging
    return res.status(403).json({error: 'Unauthorized: Invalid refresh token'});
  }
};

module.exports = authMiddleware;
