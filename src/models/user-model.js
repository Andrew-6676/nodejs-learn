import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../data-access/db';

export class UserModel extends Model {}

UserModel.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
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
