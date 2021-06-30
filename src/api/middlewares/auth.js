const logger = require('../../config/logging');
const jwt = require('jsonwebtoken');

const config = require('../../config/config');
const { StatusCodes } = require('http-status-codes');

const handle = (req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[1], config.SECRET, (err) => {
            if (err) {
                logger.error(`FORBIDDEN: bad token`);
                res.status(StatusCodes.FORBIDDEN).end('Failed to authenticate token');
            } else {
                return next();
            }
        });
    } else {
        logger.error(`FORBIDDEN: there is no token`);
        res.status(StatusCodes.FORBIDDEN).end('Not token provided');
    }
};

module.exports = handle;
