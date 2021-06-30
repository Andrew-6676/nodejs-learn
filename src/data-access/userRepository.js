const { Op } = require('sequelize');
const { GroupModel } = require('../models');

class Mapper {
    toDomain(entity) {
        return entity?.toJSON();
    }
}

const include = {
    model: GroupModel,
    attributes: ['name', 'permissions'],
    through: {
        attributes: []
    }
};

class UserRepository {
    constructor(userModel, userMapper = new Mapper()) {
        this.model = userModel;
        this.mapper = userMapper;
    }

    async getById(id) {
        const user = await this.model.findByPk(id, { include });
        return this.mapper.toDomain(user);
    }

    async getAll() {
        const users = await this.model.findAll({
            where: { isDeleted: false },
            include
        });
        return users.map((u) => this.mapper.toDomain(u));
    }

    create(user) {
        return this.model.create(user);
    }

    update(id, user) {
        return this.model.update(user, {
            where: { id }
        });
    }

    delete(id) {
        return this.model.update(
            { isDeleted: true },
            {
                where: { id }
            }
        );
    }

    async autoSuggestUsers(loginSubstring, limit) {
        const users = await this.model.findAll({
            where: { [Op.and]: [{ login: { [Op.startsWith]: loginSubstring } }, { isDeleted: false }] },
            order: [['login', 'ASC']],
            limit
        });
        return users.map((u) => this.mapper.toDomain(u));
    }
}

module.exports = UserRepository;
