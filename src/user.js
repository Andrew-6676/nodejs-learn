import { filter, find, merge, take } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import logger from './logging';

class Users {
    constructor() {
        this.list = [];
    }

    add(user) {
        user.id = uuidv4();
        user.isDeleted = false;
        this.list.push(user);
        logger.debug(`New user created: ${user.id}`);
    }

    update(id, updatedUser) {
        const user = this.get(id);
        if (user) {
            merge(user, { ...updatedUser, id });
            logger.debug(`User updated: ${id}`);
        }
        return user;
    }

    delete(id) {
        const user = find(this.list, { id });
        user.isDeleted = true;
        logger.debug(`User deleted: ${id}`);
    }

    get(id) {
        if (id) {
            return find(this.list, { id, isDeleted: false });
        }
        return filter(this.list, ['isDeleted', false]);
    }

    getAutoSuggestUsers(loginSubstring, limit) {
        return take(
            filter(this.list, (user) => {
                return !user.isDeleted && user.login.includes(loginSubstring);
            }),
            limit
        );
    }
}

export default new Users();
