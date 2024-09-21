const session = require('express-session');
const MongoStore = require('connect-mongo');

// Export a function to set up Mongo session store
module.exports = function () {
    return session({
        secret: process.env.REDIS_SECRET, // Replace with a strong secret key
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
            collectionName: 'sessions', // Optional: Customize the collection name
        }),
        cookie: {
            secure: process.env.ENVIRONMENT !== "development", // if true: only transmit cookie over https
            httpOnly: true, // if true: prevents client side JS from reading the cookie
            maxAge: 1000 * 60 * 30, // session max age in milliseconds
            sameSite: 'lax' // make sure sameSite is not none
        }
    })
};