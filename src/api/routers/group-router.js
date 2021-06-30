const express = require('express');

const validator = require('../validation/validators');
const { asyncHandler } = require('../middlewares/error-handler');
const { addUser, deleteGroup, getAllGroups, getGroupById, postGroup, putGroup } = require('../../controllers/group-controller');
const { group, newGroup, user2group } = require('../validation/group-schemas');
const { uuid } = require('../validation/common-schemas');

const groupRouter = express.Router();

groupRouter.post('/add_users', validator(user2group, 'body'), asyncHandler(addUser));

groupRouter.route('/').get(asyncHandler(getAllGroups)).post(validator(newGroup, 'body'), asyncHandler(postGroup));

groupRouter
    .route('/:id')
    .get(validator(uuid, 'params'), asyncHandler(getGroupById))
    .put(validator(uuid, 'params'), validator(group, 'body'), asyncHandler(putGroup))
    .delete(asyncHandler(deleteGroup));

module.exports = groupRouter;
