const Ajv = require('ajv');
const { StatusCodes } = require('http-status-codes');
const addFormats = require('ajv-formats');

const ajv = new Ajv({
    allErrors: true
});
addFormats(ajv);

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

module.exports = (schema, property) => {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req[property]);
        if (valid) {
            return next();
        }
        res.status(StatusCodes.BAD_REQUEST).json({
            error: errorResponse(ajv.errors)
        });
    };
};
