const redisClient = require('../../config/redisClient');
const Logs = require('./Logs');

module.exports = {

    /**
     * This method is use to create a user record.
     * @param {*} req 
     * @param {*} res 
     * @returns User
     */

    createUser: async function (data) {
        const { id, name, email } = data;
        try {
            await redisClient.hmset(`user:${id}`, ['name', name, 'email', email]);
            return await this.getUser(id);
        } catch (err) {
            Logs.error(err);
            throw err;
        }
    },

    /**
     * This method is use to get a single record.
     * @param {*} req 
     * @param {*} res 
     * @returns User
     */

    getUser: async function (userId) {
        try {
            const user = await redisClient.hgetall(`user:${userId}`);

            if (!user) {
                throw "User not found"
            }

            return user;
        } catch (err) {
            Logs.error(err);
            throw err;
        }
    },

    /**
     * This method is use to update a single record.
     * @param {*} req 
     * @param {*} res 
     * @returns User
     */
    updateUser: async function (userId, data) {
        try {

            const { name, email } = data;
            try {
                await redisClient.hmset(`user:${userId}`, ['name', name, 'email', email]);
                return await this.getUser(userId);
            } catch (err) {
                Logs.error(err);
                throw err;
            }
        } catch (err) {
            Logs.error(err);
            throw err;
        }
    },

    /**
     * This method is use to delete a single record.
     * @param {*} req 
     * @param {*} res 
     * @returns User
     */
    deleteUser: async function (userId, data) {
        const userId = req.params.id;
        try {
            await redisClient.del(`user:${userId}`);
            return true;
        } catch (err) {
            Logs.error(err);
            throw err;
        }
    },
}