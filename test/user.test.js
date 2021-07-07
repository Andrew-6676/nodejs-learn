const express = require('express');
const request = require('supertest');

const userRouter = require('../src/api/routers/user-router');

jest.mock('../src/models', () => () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const GroupModel = dbMock.define('group',  {
        userId: 2,
        emailId: 'xyz@abc.com',
        firstName: 'good',
        lastName: 'day',
        creTs: '2019-01-01 13:30:31',
        creUserId: 'dummy'
    });

    const UserModel = dbMock.define('user', {
        id: 'c7348589-fe25-4147-947b-a5c2f5845014',
        name: 'Group_2',
        permissions: ['READ', 'SHARE', 'WRITE', 'UPLOAD']
    });

    const UserGroupModel = dbMock.define('usergroup', {
        uid: '41e0a4e8-070e-43ea-a7b3-d09e42182a11',
        gid: 'ec2a3789-67bb-4c0b-872d-22d4ff3401dc'
    });

    return { UserModel, GroupModel, UserGroupModel };
});

function createApp() {
    const app = express();

    app.use(express.json()).use(userRouter);

    return app;
}

describe('', () => {
    let app;

    beforeAll((done) => {
        process.env.NODE_ENV = 'test';
        app = createApp();
        app.listen((err) => {
            if (err) {
                return done(err);
            }
            done();
        });
    });

    beforeEach(() => {

    });

    afterEach(() => {

    });

    it('should ', async (done) => {
        const res = await request(app)
            .get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).isPrototypeOf(Array);
        console.log('=====>', res.body);
        done();
    });
});
