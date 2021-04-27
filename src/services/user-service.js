import { Op } from 'sequelize';

import logger from '../config/logging';
import { User } from '../models/user-model';

class UserService {
    constructor() {}

    async add(user) {
        user.isDeleted = false;
        const newUser = await User.create(user);
        logger.debug(`New user created: ${newUser.id}`);
        return newUser.id;
    }

    async update(id, updatedUser) {
        const res = await User.update(updatedUser, {
            where: { id }
        });
        logger.debug(`user [${updatedUser.id}] updated`);
        return res;
    }

    async delete(id) {
        const res = await User.update(
            { isDeleted: true },
            {
                where: { id }
            }
        );
        console.log('====> delete', res);
        return res;
    }

    async get(id) {
        if (id) {
            const user = await User.findByPk(id);
            return user.toJSON();
        }

        const users = await User.findAll({
            where: { isDeleted: false }
        });
        return users.map((u) => u.toJSON());
    }

    async getAutoSuggestUsers(loginSubstring, limit) {
        const users = await User.findAll({
            where: { [Op.and]: [{ login: { [Op.startsWith]: loginSubstring } }, { isDeleted: false }] },
            limit
        });
        return users.map((u) => u.toJSON());
    }
}

export default new UserService();
