module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('user', [
            {
                id: 'John',
                login: 'Doe',
                password: 'pass',
                age: 55,
                isDeleted: false
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user', null, {});
    }
};
