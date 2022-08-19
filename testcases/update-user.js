const chai = require('chai');
const expect = chai.expect;
const api = require('../api/apiWeek3');
const scenario = require('../scenarios/update-user');
const requestBody = require('../data/update-user.json');
const requestBody2 = require('../data/update-user-age.json');
const requestBody3 = require('../data/update-user-hobbies.json');
const requestBody4 = require('../data/update-user-id.json');
const jsonSchema = require('../schemas/update-user-schema.json');


chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe(`${scenario.testcase.description}`, async () => {
    
    before(async () => {
        console.log("before hooks");
        let response = await api.postUser(requestBody);
        expect(response.status).to.equal(200);
    })

    after(async () => {
        console.log("after hooks");
        let response = await api.deleteUser(requestBody);
        expect(response.status).to.equal(200);
    })

    beforeEach(async () => {
        console.log("before each hooks");

    })

    afterEach(async () => {
        console.log("after each hooks");
    })

    it(`${scenario.testcase.positive.case1}`, async () => {
        const occupationCheck = 'QA Engineer'
        const nationalityCheck = 'Indonesia'

        //let oku = (requestBody.occupation = 'OKII')
        let response = await api.putUser(requestBody);
        let bodyData = response.body;
        
        //console.log(bodyData) 
        expect(response.status).to.equal(200);
        expect(bodyData.id).not.to.be.null;
        expect(response.body).to.be.contain({occupation: occupationCheck});
        expect(response.body).to.be.contain({nationality: nationalityCheck});
        expect(response.body).has.jsonSchema(jsonSchema);
        
    });

    it(`${scenario.testcase.negative.case2}`, async () => {
        //const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';
        const hobi = '';

        let response = await api.putUser(requestBody3);
        let bodyData = response.body;

        //console.log(bodyData);
        for(let index = 0; index < bodyData.data; index += 1) {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.contain({message: 'you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender'});
        expect(response.body).to.be.contain({errorCode: 'ER-03'});
        //expect(response.body.hobbies.length).to.equal(0);
        //expect(response.body).has.jsonSchema(jsonSchema);
        }
        
    });

    it(`${scenario.testcase.negative.case1}`, async () => {
        const ageUser = '0';

        let response = await api.putUser(requestBody2);
        let bodyData = response.body;

        for(let index = 0; index < bodyData.data; index += 1) {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.contain({message: 'you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender'});
        expect(response.body).to.be.contain({errorCode: 'ER-03'});
        }

    });

    it(`${scenario.testcase.negative.case3}`, async () => {
        const idUser = null;

        let response = await api.putUser(requestBody4);
        let bodyData = response.body;

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(response.status).to.equal(404);
            expect(bodyData.data[3]).to.equal(idUser);
            expect(response.body).to.be.contain({message: 'user not found'});
            expect(response.body).to.be.contain({errorCode: 'ER-01'});
        }
    })
});
