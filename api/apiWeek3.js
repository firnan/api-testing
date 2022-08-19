const httpCaller = require('supertest');
const serverAPI = httpCaller('http://localhost:1234');

    function putUser(idUser) {
        return serverAPI.put(`/v1/users`)
            .query({
                id: idUser,
            })
            .set('Connection', 'keep-alive')
            .set('Content-type', 'application/json')
            .send(idUser);       
    }

    function getUser(inputNama) {
        return serverAPI.get(`/v1/users`)
            .query(
                {
                    name: inputNama,
                }
            )
            .set('Connection', 'keep-alive')
            .set('Content-type', 'application/json');
    }

    function deleteUser(idUser) {
        return serverAPI.put(`/v1/users`)
            .query({
                id: idUser,
            })
            .set('Connection', 'keep-alive')
            .set('Content-type', 'application/json')    
    }

    function postUser(bodyRequestData) {
        return serverAPI.post('/v1/users')
            .set('Connection', 'keep-alive')
            .set('Content-type', 'application/json')
            .send(bodyRequestData);
    }

module.exports = {
    putUser,
    getUser,
    postUser,
    deleteUser,
}