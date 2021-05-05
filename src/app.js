const express = require('express');

const errorHandler = require('./api/middlewares/error-handler');
const requestLogger = require('./api/middlewares/request-logger');
const userRouter = require('./api/routers/user-router');
const config = require('./config/config');
const logger = require('./config/logging');
const { connect } = require('./data-access/connection');

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler);

connect()
    .then(() => {
        app.listen(config.PORT, () => {
            logger.info(`Task_3 app listening at http://localhost:${config.PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`Unable to connect to the database: ${error}`);
    });
