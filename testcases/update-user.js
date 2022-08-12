const chai = require('chai');
const expect = chai.expect;
const api = require('../api/apiWeek3');
const scenario = require('../scenarios/update-user');
const requestBody = require('../data/update-user.json');
const requestBody2 = require('../data/update-user-age.json');
const requestBody3 = require('../data/update-user-hobbies.json');
const requestBody4 = require('../data/update-user-id.json');
const requestBody5 = require('../data/create-user.json');
const jsonSchema = require('../schemas/update-user-schema.json');
const jsonSchema2 = require('../schemas/update-user-schema-error.json');

chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe(`${scenario.testcase.description}`, async () => {
    
    it(`${scenario.testcase2.positive.case1}`, async () => {
        const name = 'Firnan';
        
        // const dataRequest = data.dataRequestAPIPostUser(namaYgMauDiCari);

        let response =  await api.postUser(requestBody5);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.firstName).to.equal(name);
        expect(bodyData.id).not.to.be.null;
        
        // Additional Assertion
        // response = await api.getUser(name);
        // bodyData = response.body;
        // expect(response.status).to.equal(200);

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(bodyData.data[index].firstName.toLowerCase()).to.equal(name.toLowerCase());
        }
    });

    it(`${scenario.testcase.positive.case1}`, async () => {
        const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';

        let response = await api.putUser(requestBody);
        let bodyData = response.body;

        expect(response.status).to.equal(200);
        expect(bodyData.id).to.equal(idUser);
        expect(bodyData.id).not.to.be.null;
        // console.log(response.body['occupation']);
        // console.log(response.body['nationality']);
        expect(response.body).to.be.contain({occupation: 'QA Engineer'});
        expect(response.body).to.be.contain({nationality: 'Indonesia'});
        expect(response.body).has.jsonSchema(jsonSchema);

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(bodyData.data[index].id.toLowerCase()).to.equal(idUser.toLowerCase());
        }
    });

    it(`${scenario.testcase.negative.case1}`, async () => {
        const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';

        let response = await api.putUser(requestBody2);
        let bodyData = response.body;

        expect(response.status).to.equal(400);
        // console.log(response.body['message']);
        // console.log(response.body['errorCode']);
        expect(response.body).to.be.contain({message: 'you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender'});
        expect(response.body).to.be.contain({errorCode: 'ER-03'});
        expect(response.body).has.jsonSchema(jsonSchema2);

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(bodyData.data[index]).to.equal(idUser);
        }
    });

    it(`${scenario.testcase.negative.case2}`, async () => {
        const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';

        let response = await api.putUser(requestBody3);
        let bodyData = response.body;

        expect(response.status).to.equal(400);
        expect(response.body).to.be.contain({message: 'you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender'});
        expect(response.body).to.be.contain({errorCode: 'ER-03'});
        expect(response.body).has.jsonSchema(jsonSchema2);

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(bodyData.data[index]).to.equal(idUser);
        }
    });

    it(`${scenario.testcase.negative.case3}`, async () => {
        const idUser = '2ed60d6e-1534-4f67-8a26-1a06ed892092';

        let response = await api.putUser(requestBody4);
        let bodyData = response.body;

        expect(response.status).to.equal(404);
        expect(response.body).to.be.contain({message: 'user not found'});
        expect(response.body).to.be.contain({errorCode: 'ER-01'});
        expect(response.body).has.jsonSchema(jsonSchema2);

        for(let index = 0; index < bodyData.data; index += 1) {
            expect(bodyData.data[index]).to.equal(idUser);
        }
    });
});
