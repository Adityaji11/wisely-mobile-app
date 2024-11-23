const express = require('express');
const {connectToDatabase} = require('./config/database');
require('dotenv').config();
const corsMiddleware = require('./config/cors');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cacheControl = require('./config/cacheControl');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');


/**
 * Parse request json
 */
app.use(express.json());

/**
 * Parses incoming requests with URL-encoded payloads
 */
app.use(express.urlencoded({extended: true}));

/**
 * Use the custom CORS middleware
 */
app.use(corsMiddleware);

/**
 * Compresses response bodies for all requests to improve performance.
 */
app.use(compression());

/**
 * Middleware for parsing cookies
 */
app.use(cookieParser());

/**
 * Use the custom Cache Control middleware
 */
app.use(cacheControl);

app.use(bodyParser.json());

/**
 * All the API routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/user-profile', userRoutes);


const startServer = async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
  }
};

startServer();
