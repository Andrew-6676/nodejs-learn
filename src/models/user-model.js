const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../data-access/connection');

class UserModel extends Model {}
UserModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'user', timestamps: false }
);

module.exports = UserModel;
