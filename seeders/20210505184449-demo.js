const Permissions = require('../src/models/permissions');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('groups', {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            name: Sequelize.DataTypes.STRING,
            permissions: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING)
        });
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            login: Sequelize.DataTypes.STRING,
            password: Sequelize.DataTypes.STRING,
            age: Sequelize.DataTypes.INTEGER,
            isDeleted: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false,
                field: 'is_deleted'
            }
        });
        await queryInterface.createTable('usergroups', {
            uid: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            gid: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                references: {
                    model: 'groups',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            }
        });

        await queryInterface.bulkInsert(
            'users',
            [
                {
                    id: '41e0a4e8-070e-43ea-a7b3-d09e42182a11',
                    login: 'Jane 1',
                    password: 'pass',
                    age: 44,
                    is_deleted: false
                },
                {
                    id: 'ce1e8a97-b0da-4d73-8ea7-8fc688ee64e9',
                    login: 'Jane 2',
                    password: 'pass',
                    age: 55,
                    is_deleted: false
                },
                {
                    id: '63f7f7a5-10a0-4665-919e-a777321854b3',
                    login: 'Jone',
                    password: 'pass2',
                    age: 66,
                    is_deleted: false
                },
                {
                    id: '4da3bb75-601a-4240-84c4-927ca284ce0f',
                    login: 'Jone 2',
                    password: 'pass3',
                    age: 77,
                    is_deleted: false
                },
                {
                    id: '66297e0a-44f7-46f7-a602-845d9ba985d5',
                    login: 'Jone 3',
                    password: 'pass2',
                    age: 88,
                    is_deleted: false
                }
            ],
            {}
        );
        await queryInterface.bulkInsert('groups', [
            {
                id: 'ec2a3789-67bb-4c0b-872d-22d4ff3401dc',
                name: 'Group_1',
                permissions: [Permissions.READ, Permissions.SHARE]
            },
            {
                id: 'c7348589-fe25-4147-947b-a5c2f5845014',
                name: 'Group_2',
                permissions: [Permissions.READ, Permissions.SHARE, Permissions.WRITE, Permissions.UPLOAD]
            },
            {
                id: '26849c7b-9934-483c-9fcc-d2be129f3255',
                name: 'Group_3',
                permissions: [Permissions.READ]
            }
        ]);
        await queryInterface.bulkInsert('usergroups', [
            {
                uid: '41e0a4e8-070e-43ea-a7b3-d09e42182a11',
                gid: 'ec2a3789-67bb-4c0b-872d-22d4ff3401dc'
            },
            {
                uid: 'ce1e8a97-b0da-4d73-8ea7-8fc688ee64e9',
                gid: 'c7348589-fe25-4147-947b-a5c2f5845014'
            },
            {
                uid: '4da3bb75-601a-4240-84c4-927ca284ce0f',
                gid: '26849c7b-9934-483c-9fcc-d2be129f3255'
            },
            {
                uid: '63f7f7a5-10a0-4665-919e-a777321854b3',
                gid: '26849c7b-9934-483c-9fcc-d2be129f3255'
            },
            {
                uid: '63f7f7a5-10a0-4665-919e-a777321854b3',
                gid: 'c7348589-fe25-4147-947b-a5c2f5845014'
            }
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('usergroups');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('groups');
    }
};
