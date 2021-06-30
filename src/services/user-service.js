const logger = require('../config/logging');
const UserRepository = require('../data-access/userRepository');
const { UserModel } = require('../models');

class UserService {
    constructor() {
        this.userRepository = new UserRepository(UserModel);
    }

    async add(user) {
        user.isDeleted = false;
        const newUser = await this.userRepository.create(user);
        logger.debug(`New user created: ${newUser.id}`);
        return newUser.id;
    }

    async update(id, updatedUser) {
        const res = await this.userRepository.update(id, updatedUser);
        logger.debug(`user [${updatedUser.id}] updated`);
        return res;
    }

    async delete(id) {
        return await this.userRepository.delete(id);
    }

    async getById(id) {
        return await this.userRepository.getById(id);
    }

    async getAll() {
        return await this.userRepository.getAll();
    }

    async getAutoSuggestUsers(loginSubstring, limit) {
        return await this.userRepository.autoSuggestUsers(loginSubstring, limit);
    }

    async findUser(username, password) {
        return await this.userRepository.findUser({ login: username, password });
    }
}

module.exports = new UserService();
