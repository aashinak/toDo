const responseHandler = (req, res, next) => {
    // for api response
    res.sendSuccess = (statusCode, data = null, message = "Success") => {
        res.status(statusCode).json({
            message,
            data,
            success: true,
        });
    };
    // for api error response
    res.sendError = (statusCode, error = null) => {
        res.status(statusCode).json({
            statusCode,
            error,
            success: false,
        });
    };
    next();
};

export { responseHandler };
