/**
 * 
 * Use for a Response related helper functions.
 */

module.exports = {
    /**
     * Use to return error response
     */
    error: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'error';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },
    /**
    * Use to return blocked response
    */
    blocked: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'blocked';
        rReturn['message'] = (typeof message === 'object') ? JSON.stringify(message) : message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },

    /**
     * Use to return success response
     */
    success: function (message, data = null, extra = null) {
        var rReturn = {};
        rReturn['status'] = 'success';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        if (extra) {
            rReturn['extra'] = extra;
        }
        return rReturn;
    },

    /**
      * Use to return inprogress response
      */
    inprogress: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'inprogress';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },

    /**
      * Use to return failed response
      */
    failed: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'failed';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },

    /**
      * Use to return results in a response
      */
    results: function (message, data, count, recordExist = false, allCount = 0) {
        var rReturn = {};
        rReturn['status'] = 'success';
        rReturn['message'] = message;
        rReturn['data'] = { list: data, size: count, record_exist: recordExist, all_count: allCount };
        return rReturn;
    },
}