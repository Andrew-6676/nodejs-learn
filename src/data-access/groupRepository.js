const { sequelize } = require('./connection');
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

    async create(group) {
        return this.groupModel.create(group);
    }

    async update(id, group) {
        return this.groupModel.update(group, {
            where: { id }
        });
    }

    async delete(id) {
        return this.groupModel.destroy({ where: { id } });
    }

    async addUsersToGroup(gid, uids) {
        return await sequelize.transaction((transaction) => {
            return this.userGroupsModel.bulkCreate(
                uids.map((uid) => ({ gid, uid })),
                { transaction }
            );
        });
    }
}

module.exports = GroupRepository;
