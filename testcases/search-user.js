const chai = require('chai');
const expect = chai.expect;
const api = require('../api/apiWeek3');
const scenario = require('../scenarios/search-user');
const requestBody = require('../data/create-user.json');
const jsonSchema = require('../schemas/update-user-schema.json');
const jsonSchema2 = require('../schemas/get-user-schema.json');

chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe(`${scenario.testcase.description}`, async () => {

    before(async () => {
        console.log("before hooks");
        let response = await api.putUser(requestBody);
        expect(response.status).to.equal(200);
    })

    // after(async () => {
    //     console.log("after hooks");
    //     const id = '2ed60d6e-1534-4f67-8a26-1a06ed892092';
    //     let response = await api.deleteUser(id);
    //     expect(response.status).to.equal(200);
    // })

    it(`${scenario.testcase.positive.case1}`, async () => {
        
        const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';
        let response = await api.getUser(idUser);
        
        expect(response.status).to.equal(200);
        console.log(idUser);
        expect(response.body).has.jsonSchema(jsonSchema);
        //expect(response.body.data).contains.something.like({"id": 'f2878d40-ca76-4397-a5bb-a8820e8cfb5d'});
    })

    it(`${scenario.testcase.negative.case1}`, async () => {
        
        const idUser = 'wrong-id';
        let response = await api.getUser2(idUser);
        
        expect(response.status).to.equal(404);
        console.log(idUser);
        expect(response.body).to.be.contain({message: 'user not found'});
        expect(response.body).to.be.contain({errorCode: 'ER-01'});
        //expect(response.body).has.jsonSchema(jsonSchema);
        //expect(response.body.data).contains.something.like({"id": 'f2878d40-ca76-4397-a5bb-a8820e8cfb5d'});
    })
})