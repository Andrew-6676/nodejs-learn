const { Sequelize } = require('sequelize');
const logger = require('../config/logging');
const config = require('../config/config');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    logging: (msg) => logger.debug(`SQL: ${msg}`),
    benchmark: true
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};

const close = () => sequelize.close();

module.exports = { sequelize, connect, close };
