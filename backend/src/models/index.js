// models/index.js
const dotenv = require('dotenv');
dotenv.config();

const dbType = process.env.DB_TYPE;
let User;

if (dbType === 'mysql') {
    const sequelizeDb = require('../../config/database');
    const Sequelize = require('sequelize');
    User = require('./mysql/User.js')(sequelizeDb, Sequelize);
} else if (dbType === 'mongodb') {
    require('../../config/database.js'); // Connect to MongoDB
    User = require('./mongodb/User.js');
}

module.exports = { User };