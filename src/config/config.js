import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: join(__dirname, '../.env')
});

export default {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    LOGS_DIR: join(__dirname, '../logs'),
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST
};

export const conf = {
    development: {
        username: 'root',
        password: null,
        database: 'database_development',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
