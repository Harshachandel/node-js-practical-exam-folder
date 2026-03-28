exports.successResponse = (res, message, data = null) => { // data null kiya beacause res is second parameter and woh null hai 
    return res.json({
        success: true,
        message,
        data
    });
};



exports.errorResponse = (res, error) => {
    return res.json({
        success: false,
        message: error.message || error
    });
};
