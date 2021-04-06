import { StatusCodes } from 'http-status-codes';
import express from 'express';
const userRouter = express.Router();

userRouter.get(
    '/:id',
    async (req, res) => {
        res.status(StatusCodes.OK).send(req.params);
    }
);
userRouter.post(
    '/',
    async (req, res) => {
        res.status(StatusCodes.OK).send(req.params);
    }
);

userRouter.put(
    '/:id',
    async (req, res) => {
        res.status(StatusCodes.OK).send(req.params);
    }
);
//
userRouter.delete(
    '/:id',
    async (req, res) => {
        res.sendStatus(StatusCodes.NO_CONTENT);
    }
);

export default userRouter;
