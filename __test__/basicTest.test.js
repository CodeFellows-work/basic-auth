'use strict';


const server = require('../src/server.js');
const supertest = require('supertest');

const request = supertest(server.app); 

const { Sequelize } = require('sequelize')
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);


let user = { 
    username: 'sunny',
    password: 'secret'
}

beforeAll(async () => {
    await sequelize.sync();
});
afterAll(async () => {
    await sequelize.drop();
});

describe('Testing user', () => {

    it('Creating a new user', async () => {
        const response = await request.post('/signup').send(user);
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual('sunny');
});
    it('Testing to find user data on POST', async () => {
        const response = await request
            .post('/signin')
            .set('Authorization', 'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),)
        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(user.username);
    });
    it('Tests for correct username', async () => { 
        const response = await request
        .post('/signin')
        .set('Authorization', 'basic ' + new Buffer.from(`testwronguser:${user.password}`, 'utf8').toString('base64'),)
        expect(response.status).toEqual(403);
        expect(response.text).toEqual('Invalid Login');
    });
    it('Tests for correct password', async () => { 
        const response = await request
        .post('/signin')
        .set('Authorization', 'basic ' + new Buffer.from(`${user.username}:testwrongpass`, 'utf8').toString('base64'),)
        expect(response.status).toEqual(401);
        expect(response.text).toEqual('Authentication Error');
    })
})