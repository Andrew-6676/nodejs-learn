const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

const UserModel = Model.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.NUMBER,
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { sequelize, modelName: 'user', timestamps: false }
);

module.exports = UserModel;
