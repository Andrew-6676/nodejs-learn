const commonProperties = {
    login: { type: 'string', minLength: 6 },
    password: { type: 'string', minLength: 8, pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$' },
    age: { type: 'number', minimum: 4, maximum: 130 }
};

const uuid = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        }
    }
};

const user = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        ...commonProperties,
        isDeleted: { type: 'boolean' }
    },
    required: ['id', 'login', 'password', 'age', 'isDeleted'],
    additionalProperties: false
};

const newUser = {
    type: 'object',
    properties: commonProperties,
    required: ['login', 'password', 'age'],
    additionalProperties: false
};

module.exports = {
    uuid,
    user,
    newUser
};
