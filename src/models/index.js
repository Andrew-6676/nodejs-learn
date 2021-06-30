const UserModel = require('./user-model');
const GroupModel = require('./group-model');
const UserGroupModel = require('./user-group-model');

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'uid' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'gid' });

module.exports = { UserModel, GroupModel, UserGroupModel };
