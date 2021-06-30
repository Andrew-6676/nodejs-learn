const logger = require('../../config/logging');

const handle = (req, res, next) => {
    logger.info(`${req.method}: ${req.originalUrl}; body=${JSON.stringify(req.body)}`, {
        method: req.method,
        url: req.originalUrl,
        body: req.body
    });
    next();
};

module.exports = handle;
