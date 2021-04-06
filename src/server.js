import express from 'express';

import errorHandler from './error-handler';
import userRouter from './user-router';
import config from './config';
import logger from './logging';

const app = express();
const port = config.PORT;

app.use(express.json());

app.use('/users', userRouter);
app.use(errorHandler);

logger.info('test');
logger.error('test');
logger.debug('test');

app.listen(port, () => {
    logger.info(`Task_2 app listening at http://localhost:${port}`);
});
