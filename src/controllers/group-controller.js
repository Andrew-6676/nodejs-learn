const { StatusCodes } = require('http-status-codes');

const GroupService = require('../services/group-service');

const groupService = GroupService;

module.exports = {
    addUser: async (req, res) => {
        await groupService.addUsersToGroup(req.body.gid, req.body.uids);
        res.sendStatus(StatusCodes.NO_CONTENT);
    },
    deleteGroup: async (req, res) => {
        await groupService.delete(req.params.id);
        res.sendStatus(StatusCodes.NO_CONTENT);
    },
    getAllGroups: async (req, res) => {
        res.status(StatusCodes.OK).send(await groupService.getAll());
    },
    getGroupById: async (req, res) => {
        const resp = await groupService.getById(req.params.id);
        if (resp) {
            res.status(StatusCodes.OK).send(resp);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`group '${req.params.id}' not found`);
        }
    },
    postGroup: async (req, res) => {
        const id = await groupService.add(req.body);
        res.status(StatusCodes.CREATED).send({ id });
    },
    putGroup: async (req, res) => {
        const resp = await groupService.update(req.params.id, req.body);
        if (resp[0]) {
            res.sendStatus(StatusCodes.NO_CONTENT);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`group '${req.params.id}' not found`);
        }
    }
};
