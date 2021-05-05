import express from 'express';

import errorHandler from './api/middlewares/error-handler';
import requestLogger from './api/middlewares/request-logger';
import userRouter from './api/routers/user-router';
import config from './config/config';
import logger from './config/logging';
import sequelize from './data-access/db';

const app = express();

app.use(requestLogger);
app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler);

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
