const uuid = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.STRING,
                primaryKey: true
            },
            login: Sequelize.DataTypes.STRING,
            password: Sequelize.DataTypes.STRING,
            age: Sequelize.DataTypes.INTEGER,
            isDeleted: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: uuid.v4(),
                    login: 'Jane 1',
                    password: 'pass',
                    age: 44,
                    isDeleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Jane 2',
                    password: 'pass',
                    age: 55,
                    isDeleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Jone',
                    password: 'pass2',
                    age: 66,
                    isDeleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Jone 2',
                    password: 'pass3',
                    age: 77,
                    isDeleted: false
                },
                {
                    id: uuid.v4(),
                    login: 'Jone 3',
                    password: 'pass2',
                    age: 88,
                    isDeleted: false
                }
            ],
            {}
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    }
};
