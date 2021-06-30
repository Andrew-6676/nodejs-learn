const express = require('express');

const { errorHandler } = require('./api/middlewares/error-handler');
const requestLogger = require('./api/middlewares/request-logger');
const userRouter = require('./api/routers/user-router');
const groupRouter = require('./api/routers/group-router');
const config = require('./config/config');
const logger = require('./config/logging');
const { connect } = require('./data-access/connection');

const app = express();

process.on('uncaughtException', (err, origin) => {
    logger.error(`Caught exception:${err}\nException origin: ${origin}`);
});

process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at: ${p}, reason: ${reason}`);
});

app.use(express.json()).use(requestLogger).use('/users', userRouter).use('/groups', groupRouter).use(errorHandler);

connect()
    .then(() => {
        app.listen(config.PORT, () => {
            logger.info(`Task_5 app listening at http://localhost:${config.PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`Unable to connect to the database: ${error}`);
    });
