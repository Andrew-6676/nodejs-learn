const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/user-service');

const userService = UserService;

module.exports = {
    deleteUser: async (req, res) => {
        await userService.delete(req.params.id);
        res.sendStatus(StatusCodes.NO_CONTENT);
    },
    getAllUsers: async (req, res) => {
        res.status(StatusCodes.OK).send(await userService.getAll());
    },
    getUserById: async (req, res) => {
        const resp = await userService.getById(req.params.id);
        if (resp) {
            res.status(StatusCodes.OK).send(resp);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
        }
    },
    postUser: async (req, res) => {
        const id = await userService.add(req.body);
        res.status(StatusCodes.CREATED).send({ id });
    },
    putUser: async (req, res) => {
        const resp = await userService.update(req.params.id, req.body);
        if (resp[0]) {
            res.sendStatus(StatusCodes.NO_CONTENT);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
        }
    },
    suggest: async (req, res) => {
        const resp = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
        res.status(StatusCodes.OK).send(resp);
    }
};
