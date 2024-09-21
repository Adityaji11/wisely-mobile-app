/**
 * 
 * Use for a Account application related helper functions.
 */

const axios = require("axios");
const Helper = require('./Helper');

module.exports = {
    /**
     * Call users api for token authenticate
     */
    tokenAuth: function (token) {
        return new Promise(async (resolve, reject) => {
            try {
                var [err, response] = await Helper.to(axios({
                    method: 'post',
                    url: process.env.ACCOUNT_API_URL + `customer/authenticate`,
                    data: {},
                    headers: { 'Authorization': `Bearer ${token}` }
                }));
                if (err) {
                    return reject(Helper.formatAxiosError(err));
                }
                return resolve(response.data);
            } catch (err) {
                return reject(err);
            }
        });
    },

    /**
     * Call users api for signup
     */
    signUp: function (data) {
        return new Promise(async (resolve, reject) => {
            try {

                var [err, response] = await Helper.to(axios({
                    method: 'post',
                    url: process.env.ACCOUNT_API_URL + `customer`,
                    data: data,
                    auth: {
                        'username': process.env.ACCOUNT_API_KEY,
                        'password': process.env.ACCOUNT_API_SECRETKEY
                    }
                }));

                if (err) {
                    return reject(Helper.formatAxiosError(err));
                }

                if (!response) {
                    throw "Account signup response failed!";
                }

                return resolve(response.data);
            } catch (err) {
                return reject(err);
            }
        });
    },

    /**
     * Call users api for signin
     */
    singIn: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                var [err, response] = await Helper.to(axios({
                    method: 'post',
                    url: process.env.ACCOUNT_API_URL + `customer/authorize`,
                    data: data,
                    auth: {
                        'username': process.env.ACCOUNT_API_KEY,
                        'password': process.env.ACCOUNT_API_SECRETKEY
                    }
                }));

                if (err) {
                    return reject(Helper.formatAxiosError(err));
                }

                if (!response) {
                    throw "Account login response failed!";
                }

                return resolve(response.data);
            } catch (err) {
                return reject(err);
            }
        });
    },

    /**
     * Get user by id
     */
    getUserById: async function (id, callback = null) {
        return new Promise(async (resolve, reject) => {
            try {
                var [err, response] = await Helper.to(axios({
                    method: 'get',
                    url: process.env.ACCOUNT_API_URL + `customer/${id}`,
                    auth: {
                        'username': process.env.ACCOUNT_API_KEY,
                        'password': process.env.ACCOUNT_API_SECRETKEY
                    }
                }));

                if (err) {
                    return reject(Helper.formatAxiosError(err));
                }

                if (!response) {
                    throw "Get user by ID response failed!";
                }

                return resolve(response.data);
            } catch (err) {
                return reject(err);
            }
        });
    },
}
