const { Model, DataTypes } = require('sequelize');
const uuid = require('uuid');
const { sequelize } = require('../data-access/connection');

const UserModel = Model.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuid.v4()
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
