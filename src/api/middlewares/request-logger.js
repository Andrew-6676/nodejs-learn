const logger = require('../../config/logging');

const handle = (req, res, next) => {
    logger.debug(`${req.method}: ${req.path}`);
    next();
};

module.exports = handle;
