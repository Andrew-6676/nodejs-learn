import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize('learn', config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'postgres',
    logging: true,
    benchmark: true
});

export default sequelize;
