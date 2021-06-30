const express = require('express');

const validator = require('../validation/validators');
const { asyncHandler } = require('../middlewares/error-handler');
const { user, newUser } = require('../validation/user-schemas');
const { uuid } = require('../validation/common-schemas');
const { deleteUser, getAllUsers, getUserById, postUser, putUser, suggest } = require('../../controllers/user-controller');

const userRouter = express.Router();

userRouter.get('/suggest', asyncHandler(suggest));

userRouter.route('/').get(getAllUsers).post(validator(newUser, 'body'), asyncHandler(postUser));

userRouter
    .route('/:id')
    .get(validator(uuid, 'params'), asyncHandler(getUserById))
    .put(validator(uuid, 'params'), validator(user, 'body'), asyncHandler(putUser))
    .delete(asyncHandler(deleteUser));

module.exports = userRouter;
