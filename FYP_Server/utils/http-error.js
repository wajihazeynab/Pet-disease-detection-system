class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
    }

    static internal() {
        return new HttpError(500, "Internal server error");
    }

    static badRequest(message) {
        return new HttpError(400, message);
    }

    static unauthorized(message) {
        return new HttpError(401, message);
    }

    static forbidden(message) {
        return new HttpError(403, message);
    }

    static notFound(message) {
        return new HttpError(404, message);
    }

    static conflict(message) {
        return new HttpError(409, message);
    }



    static notImplemented(message) {
        return new HttpError(501, message);
    }

    static badGateway(message) {
        return new HttpError(502, message);
    }

    static serviceUnavailable(message) {
        return new HttpError(503, message);
    }

  

}

module.exports = HttpError