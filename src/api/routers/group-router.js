const { StatusCodes } = require('http-status-codes');
const express = require('express');
const validator = require('../validation/validators');
const { group, newGroup, user2group } = require('../validation/group-schemas');
const { uuid } = require('../validation/common-schemas');
const GroupService = require('../../services/group-service');

const groupRouter = express.Router();
const groupService = new GroupService();

groupRouter.post('/add_users', validator(user2group, 'body'), async (req, res) => {
    await groupService.addUsersToGroup(req.body.gid, req.body.uids);
    res.sendStatus(StatusCodes.NO_CONTENT);
});

groupRouter
    .route('/')
    .get(async (req, res) => {
        res.status(StatusCodes.OK).send(await groupService.get());
    })
    .post(validator(newGroup, 'body'), async (req, res) => {
        const id = await groupService.add(req.body);
        res.status(StatusCodes.CREATED).send({ id });
    });

groupRouter
    .route('/:id')
    .get(validator(uuid, 'params'), async (req, res) => {
        const resp = await groupService.get(req.params.id);
        if (resp) {
            res.status(StatusCodes.OK).send(resp);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`group '${req.params.id}' not found`);
        }
    })
    .put(validator(uuid, 'params'), validator(group, 'body'), async (req, res) => {
        const resp = await groupService.update(req.params.id, req.body);
        if (resp[0]) {
            res.sendStatus(StatusCodes.NO_CONTENT);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(`group '${req.params.id}' not found`);
        }
    })
    .delete(async (req, res) => {
        await groupService.delete(req.params.id);
        res.sendStatus(StatusCodes.NO_CONTENT);
    });

module.exports = groupRouter;
