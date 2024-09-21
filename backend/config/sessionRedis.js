const redisClient = require('./redisClient');
const session = require('express-session');
const RedisStore = require("connect-redis").default;

// Export a function to set up Redis session store
module.exports = function () {
    return session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.REDIS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.ENVIRONMENT !== "development", // if true: only transmit cookie over https
            httpOnly: true, // if true: prevents client side JS from reading the cookie
            maxAge: 1000 * 60 * 30, // session max age in milliseconds
            sameSite: 'lax' // make sure sameSite is not none
        }
        // Add any other session configuration options you need
    });
};
