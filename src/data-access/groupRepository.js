const { sequelize } = require('../data-access/connection');
const { UserModel } = require('../models');

class Mapper {
    toDomain(entity) {
        return entity?.toJSON();
    }
}

const include = {
    model: UserModel,
    attributes: ['id', 'login'],
    through: {
        attributes: []
    }
};

class GroupRepository {
    constructor(groupModel, userGroupsModel, groupMapper = new Mapper()) {
        this.groupModel = groupModel;
        this.userGroupsModel = userGroupsModel;
        this.mapper = groupMapper;
    }

    async getById(id) {
        const group = await this.groupModel.findByPk(id, { include });
        return this.mapper.toDomain(group);
    }

    async getAll() {
        const groups = await this.groupModel.findAll({ include });
        return groups.map((u) => this.mapper.toDomain(u));
    }

    create(group) {
        return this.groupModel.create(group);
    }

    update(id, group) {
        return this.groupModel.update(group, {
            where: { id }
        });
    }

    delete(id) {
        return this.groupModel.destroy({ where: { id } });
    }

    async addUsersToGroup(gid, uids) {
        return await sequelize.transaction((t) => {
            return Promise.all[uids.map((uid) => this.userGroupsModel.create({ gid, uid }))];
        });
    }
}

module.exports = GroupRepository;
