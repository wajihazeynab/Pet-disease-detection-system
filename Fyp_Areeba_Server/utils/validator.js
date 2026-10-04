const { validationResult } = require("express-validator");
const HttpError = require("./http-error");
const { default: mongoose } = require("mongoose");

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = HttpError.badRequest(errors.array()[0].msg);
        return next(error);
    }

    next();
}

function isValidObjectId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = HttpError.badRequest('Invalid ID');
        throw error;
    }

    return true;
}


module.exports = {
    validateRequest
}