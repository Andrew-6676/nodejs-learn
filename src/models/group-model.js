const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../data-access/connection');

class GroupModel extends Model {}
GroupModel.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: DataTypes.STRING,
        permissions: DataTypes.ARRAY(DataTypes.STRING)
    },
    { sequelize, modelName: 'group', timestamps: false }
);

module.exports = GroupModel;
