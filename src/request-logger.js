import logger from './logging';

const handle = (req, res, next) => {
    logger.debug(`${req.method}: ${req.path}`);
    next();
};

export default handle;
