class ApiError extends Error {
    constructor(statusCode, message, error = null, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.data = null;
        this.success = false;

        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = stack;
        }
    }
}

export { ApiError };
