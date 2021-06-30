const commonGroupProperties = {
    name: { type: 'string', minLength: 3 },
    permissions: {
        type: 'array',
        uniqueItems: true,
        items: { type: 'string' }
    }
};

const group = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        },
        ...commonGroupProperties
    },
    required: ['id', 'name', 'permissions'],
    additionalProperties: false
};

const newGroup = {
    type: 'object',
    properties: commonGroupProperties,
    required: ['name', 'permissions'],
    additionalProperties: false
};

const user2group = {
    type: 'object',
    properties: {
        gid: {
            type: 'string',
            format: 'uuid'
        },
        uids: {
            type: 'array',
            uniqueItems: true,
            items: { type: 'string', format: 'uuid' }
        }
    },
    required: ['gid', 'uids'],
    additionalProperties: false
};

module.exports = {
    group,
    newGroup,
    user2group
};
