import { StatusCodes } from 'http-status-codes';
import express from 'express';

import { validator } from '../middlewares/validators';
import UserService from '../../services/user-service';

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/', async (req, res) => {
    res.status(StatusCodes.OK).send(await userService.get());
});

userRouter.get('/suggest', async (req, res) => {
    const resp = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
    res.status(StatusCodes.OK).send(resp);
});

userRouter.get('/:id', validator('uuid', 'params'), async (req, res) => {
    const resp = await userService.get(req.params.id);
    if (resp) {
        res.status(StatusCodes.OK).send(resp);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
    }
});

userRouter.put('/:id', validator('uuid', 'params'), validator('user', 'body'), async (req, res) => {
    const resp = await userService.update(req.params.id, req.body);
    if (resp[0]) {
        res.sendStatus(StatusCodes.NO_CONTENT);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' not found`);
    }
});

userRouter.delete('/:id', async (req, res) => {
    await userService.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
});

userRouter.post('/', validator('newUser', 'body'), async (req, res) => {
    const id = await userService.add(req.body);
    res.status(StatusCodes.OK).send(id);
});

export default userRouter;
