import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';

const ajv = new Ajv({
    allErrors: true
});

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        console.log(error);
        return {
            path: error.instancePath,
            message: error.message
        };
    });
    return {
        status: 'failed',
        errors
    };
};

const user = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        login: { type: 'string', minLength: 6 },
        password: { type: 'string', minLength: 8, pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$' },
        age: { type: 'number', minimum: 4, maximum: 130 },
        isDeleted: { type: 'boolean' }
    },
    required: ['id', 'login', 'password', 'age', 'isDeleted'],
    additionalProperties: false
};

ajv.addSchema(user, 'user');

export const validator = (schemaName, property) => {
    console.log('validator => ', property);
    return (req, res, next) => {
        const valid = ajv.validate(schemaName, req[property]);
        if (valid) {
            return next();
        }
        res.status(StatusCodes.BAD_REQUEST).json({
            error: errorResponse(ajv.errors)
        });
    };
};
