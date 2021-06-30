const express = require('express');

const { asyncHandler } = require('../middlewares/error-handler');
const { getToken } = require('../../controllers/auth-controller');

const authRouter = express.Router();

authRouter.route('/').post(asyncHandler(getToken));

module.exports = authRouter;
