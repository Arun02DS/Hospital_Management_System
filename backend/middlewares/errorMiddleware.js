class errorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message, 400);
    }

    if (err.name === "jsonwebTokenError") {
        const message = "JSON web token is invalid, try again";
        err = new errorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = "JSON web token is expired, try again";
        err = new errorHandler(message, 400);
    }

    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new errorHandler(message, 400);
    }

    if (err.name === "ValidationError") {
        const errorMessages = Object.values(err.errors).map((error) => {
            if (error.kind === "enum") {
                return `'${error.value}' is not a valid value for '${error.path}'. Allowed values are: {${(error.properties.enumValues).join(", ")}}`;
            }
            return error.message; 
        });
        const message = errorMessages.join(" ");
        err = new errorHandler(message, 400);
    }

    const errorMessage = err.errors ?
        Object.values(err.errors)
            .map((error) => error.message)
            .join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};


export default errorHandler;