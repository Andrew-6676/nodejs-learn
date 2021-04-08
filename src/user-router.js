import { StatusCodes } from 'http-status-codes';
import express from 'express';
import users from './user';
import { validator, userSchema } from './validators';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    res.status(StatusCodes.OK).send(users.get());
});

userRouter.get('/suggest', async (req, res) => {
    const resp = users.getAutoSuggestUsers(req.query.login, req.query.limit);
    res.status(StatusCodes.OK).send(resp);
});

userRouter.get('/:id', async (req, res) => {
    const resp = users.get(req.params.id);
    if (resp) {
        res.status(StatusCodes.OK).send(resp);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' nont found`);
    }
});

userRouter.put('/:id', validator('user', 'body'), async (req, res) => {
    const resp = users.update(req.params.id, req.body);
    if (resp) {
        res.status(StatusCodes.OK).send(resp);
    } else {
        res.status(StatusCodes.NOT_FOUND).send(`user '${req.params.id}' nont found`);
    }
});

userRouter.delete('/:id', async (req, res) => {
    users.delete(req.params.id);
    res.sendStatus(StatusCodes.NO_CONTENT);
});

userRouter.post('/', validator('user', 'body'), async (req, res) => {
    users.add(req.body);
    res.status(StatusCodes.OK).send(req.body);
});

export default userRouter;
