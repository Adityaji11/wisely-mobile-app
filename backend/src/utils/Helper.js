/**
 * 
 * Use for a General purpose helper functions.
 */


const { ObjectId } = require('mongodb');
const _ = require('lodash');

module.exports = {

    /**
     * Use to check valid BSON type
     */
    isValidObjectId: function (id) {
        return ObjectId.isValid(id);
    },

    /**
     * Use to hoandle promise
     */
    to: function (promise) {
        return promise.then(data => {
            return [null, data];
        }).catch(err => [err]);
    },

    /**
     * Validate property exist or not
     */
    hasProp: function (obj, prop) {
        if (_.has(obj, prop)) {
            return true;
        }
        return false;
    },

    /**
     * Use to format the error returned by the axios
     */
    formatAxiosError: function (err) {
        if (Helper.hasProp(err, 'response') && Helper.hasProp(err.response, 'data') && Helper.hasProp(err.response.data, 'error')) {
            err = err.response.data.error.description;
        } else if (Helper.hasProp(err, 'message')) {
            err = err.message;
        } else if (Helper.hasProp(err, 'response') && Helper.hasProp(err.response, 'data')) {
            err = err.response.data.error;
        }

        if (Helper.hasProp(err, 'config')) {
            delete err.config;
        }

        return err;
    }
}
