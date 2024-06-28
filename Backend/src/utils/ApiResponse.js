const ApiResponse = (statusCode, data, message = "Success") => {
    return res.status(statusCode).json({
        statusCode,
        data,
        message,
        success: true,
    });
};

export default ApiResponse
