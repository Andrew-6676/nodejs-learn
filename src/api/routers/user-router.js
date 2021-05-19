const { StatusCodes } = require('http-status-codes');
const express = require('express');
const validator = require('../validation/validators');
const { user, newUser } = require('../validation/user-schemas');
const { uuid } = require('../validation/common-schemas');
const UserService = require('../../services/user-service');

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/suggest', async (req, res) => {
    const resp = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
    res.status(StatusCodes.OK).send(resp);
});

userRouter
    .route('/')
    .get(async (req, res) => {
        res.status(StatusCodes.OK).send(await userService.get());
    })
    .post(validator(newUser, 'body'), async (req, res) => {
        const id = await userService.add(req.body);
        res.status(StatusCodes.CREATED).send({ id });
    });

userRouter
    .route('/:id')
    .get(validator(uuid, 'params'), async (req, res) => {
        const resp = await userService.get(req.params.id);
        if (resp) {
            res.status(StatusCodes.OK).send(resp);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
        }
    })
    .put(validator(uuid, 'params'), validator(user, 'body'), async (req, res) => {
        const resp = await userService.update(req.params.id, req.body);
        if (resp[0]) {
            res.sendStatus(StatusCodes.NO_CONTENT);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
        }
    })
    .delete(async (req, res) => {
        await userService.delete(req.params.id);
        res.sendStatus(StatusCodes.NO_CONTENT);
    });

module.exports = userRouter;
