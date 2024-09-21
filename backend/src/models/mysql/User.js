const Cipher = require('../../utils/Cipher');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        user_id: {
            type: Sequelize.INTEGER
        },
        api: {
            type: DataTypes.JSON,
            allowNull: false
        },
    }, {
        tableName: 'user',
        timestamps: true,   // Enable timestamps
    });

    // Add class-level methods here
    User.signUp = async function (userId) {
        try {
            const existingUser = await User.findOne({ where: { user_id: userId } });
            if (existingUser) {
                return existingUser;
            }

            const newUser = await User.create({
                user_id: userId,
                api: {
                    apiKey: Cipher.createSecretKey(10),
                    secretKey: Cipher.createSecretKey(16),
                }
            });

            return newUser;
        } catch (error) {
            throw error;
        }
    };

    return User;
};