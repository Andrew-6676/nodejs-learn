const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/user-service');
const config = require('../config/config');

const userService = UserService;

module.exports = {
    getToken: async (req, res) => {
        const user = await userService.findUser(req.body.username, req.body.password);
        if (user) {
            const result = {
                id: user.id,
                login: user.login,
                age: user.age,
                groups: user.groups
            };
            res.status(StatusCodes.OK).send({
                ...result,
                token: jwt.sign(result, config.SECRET, { expiresIn: 1000 * 60 * 60 })
            });
        } else {
            res.status(StatusCodes.FORBIDDEN).send(`Wrong username or password`);
        }
    }
};
