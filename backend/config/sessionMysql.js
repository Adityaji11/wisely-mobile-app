const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('../config/database');

module.exports = function () {
    const store = new SequelizeStore({
        db: sequelize,
        tableName: 'sessions' // Optional: Customize the table name
    });

    return session({
        secret: process.env.SESSION_SECRET, // Replace with a strong secret key
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: process.env.ENVIRONMENT !== "development", // if true: only transmit cookie over https
            httpOnly: true, // if true: prevents client-side JS from reading the cookie
            maxAge: 1000 * 60 * 30, // session max age in milliseconds
            sameSite: 'lax' // make sure sameSite is not none
        }
    });
};
