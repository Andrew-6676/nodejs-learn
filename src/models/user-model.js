import { Model, DataTypes } from 'sequelize';

export class User extends Model {}
User.init(
    {
        id: DataTypes.STRING,
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.NUMBER,
        isDeleted: DataTypes.BOOLEAN
    },
    { sequelize, modelName: 'user' }
);
