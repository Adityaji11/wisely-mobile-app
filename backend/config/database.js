// config/db.config.js
const dotenv = require('dotenv');
dotenv.config();

const dbType = process.env.DB_TYPE;
let dbConfig;
// if (dbType === 'mysql') {
//     const { Sequelize } = require('sequelize');
//     const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: 'mysql'
//     })
//     dbConfig = sequelize;
// } 
 if (dbType === 'mongodb') {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI, {});
    dbConfig = mongoose;
}

module.exports = dbConfig;