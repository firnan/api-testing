const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');

function putUser(bodyRequestData) {
    return serverAPI.put(`/v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

module.exports = {
    putUser,
}