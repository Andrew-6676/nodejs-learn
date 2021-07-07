const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../data-access/connection');

class UserGroupModel extends Model {}
UserGroupModel.init(
    {
        uid: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        gid: {
            type: DataTypes.UUID,
            primaryKey: true,
            references: {
                model: 'groups',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    },
    { sequelize, modelName: 'usergroup', timestamps: false }
);

module.exports = UserGroupModel;
