exports.success = (message, data = null) => {
    return { success: true, message, data };
  };
  
  exports.error = (message, error = null) => {
    return { success: false, message, error };
  };
  