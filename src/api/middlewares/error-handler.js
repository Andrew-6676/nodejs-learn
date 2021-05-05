const { StatusCodes, statusCode } = require('http-status-codes');
const logger = require('../../config/logging');

const handler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send(err.message);
    } else {
        logger.error(err.stack);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(statusCode(StatusCodes.INTERNAL_SERVER_ERROR));
    }
    next();
};

module.exports = handler;
