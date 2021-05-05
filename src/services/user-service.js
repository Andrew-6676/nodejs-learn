import logger from '../config/logging';
import UserRepository from '../data-access/userRepository';
import { UserModel } from '../models/user-model';

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

    async get(id) {
        if (id) {
            return await this.userRepository.getById(id);
        }

        return await this.userRepository.getAll();
    }

    async getAutoSuggestUsers(loginSubstring, limit) {
        return await this.userRepository.autoSuggestUsers(loginSubstring, limit);
    }
}

export default UserService;
