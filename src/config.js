import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '../.env')
});

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    LOGS_DIR: join(__dirname, '../logs')
};
