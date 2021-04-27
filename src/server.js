import express from 'express';

import errorHandler from './error-handler';
import requestLogger from './request-logger';
import userRouter from './routers/user-router';
import config from './config/config';
import logger from './config/logging';
import sequelize from './data-access/data';

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler);

logger.info('test');
logger.error('test');
logger.debug('test');

sequelize
    .authenticate()
    .then(() => {
        logger.info('Connection has been established successfully.');
        app.listen(config.PORT, () => {
            logger.info(`Task_3 app listening at http://localhost:${config.PORT}`);
        });
    })
    .catch((error) => {
        logger.error(`Unable to connect to the database: ${error}`);
    });
