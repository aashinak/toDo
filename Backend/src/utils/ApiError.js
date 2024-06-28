const ApiError = (statusCode, error = "", message = "Something went wrong") => {
    return res.status(statusCode).json({
        statusCode,
        error,
        message,
        success: false,
    });
};

export default ApiError
