const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');

function putUser(bodyRequestData) {
    return serverAPI.put(`/v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

function getUser(inputId) {
    return serverAPI.get(`/v1/users/2ed60d6e-1534-4f67-8a26-1a06ed892092`)
        .query(
            {
                name: inputId,
            }
        )
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
}

function getUser2(inputId2) {
    return serverAPI.get(`/v1/users/wrong-id`)
        .query(
            {
                name: inputId2,
            }
        )
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
}

function postUser(bodyRequestData) {
    return serverAPI.post('/v1/users')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(bodyRequestData);
}

function deleteUser(inputId) {
    return serverAPI.delete(`/v1/users/2ed60d6e-1534-4f67-8a26-1a06ed892092`)
        .query(
            {
                name: inputId,
            }
        )
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
}

module.exports = {
    putUser,
    getUser,
    getUser2,
    postUser,
    deleteUser,
}