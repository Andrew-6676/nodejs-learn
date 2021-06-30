const { StatusCodes } = require('http-status-codes');
const logger = require('../../config/logging');

const asyncHandler = (callback) => (req, res, next) => callback(req, res, next).catch(next);

const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        logger.error(err.stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.toString());
    }
    next();
};

module.exports = { errorHandler, asyncHandler };
