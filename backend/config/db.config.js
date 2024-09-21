// config/db.config.js
const dotenv = require('dotenv');
dotenv.config();

const dbType = process.env.DB_TYPE;

let dbConfig;

if (dbType === 'mysql') {
  const { Sequelize } = require('sequelize');
  dbConfig = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });
} else if (dbType === 'mongodb') {
  const mongoose = require('mongoose');
  dbConfig = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = dbConfig;
