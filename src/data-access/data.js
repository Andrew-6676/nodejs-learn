const { Sequelize } = require('sequelize');
import config from '../config/config';

const sequelize = new Sequelize('learn', config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'postgres'
});

export default sequelize;
