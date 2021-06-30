const uuid = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            format: 'uuid'
        }
    }
};

module.exports = {
    uuid
};
