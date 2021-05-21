const logger = require('../config/logging');
const GroupRepository = require('../data-access/groupRepository');
const { GroupModel } = require('../models');
const { UserGroupModel } = require('../models');

class GroupService {
    constructor() {
        this.groupRepository = new GroupRepository(GroupModel, UserGroupModel);
    }

    async add(group) {
        group.isDeleted = false;
        const newgroup = await this.groupRepository.create(group);
        logger.debug(`New group created: ${newgroup.id}`);
        return newgroup.id;
    }

    async update(id, updatedgroup) {
        const res = await this.groupRepository.update(id, updatedgroup);
        logger.debug(`group [${updatedgroup.id}] updated`);
        return res;
    }

    async delete(id) {
        return await this.groupRepository.delete(id);
    }

    async get(id) {
        if (id) {
            return await this.groupRepository.getById(id);
        }

        return await this.groupRepository.getAll();
    }

    async addUsersToGroup(gid, uids) {
        return await this.groupRepository.addUsersToGroup(gid, uids);
    }
}

module.exports = GroupService;
