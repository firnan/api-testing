const chai = require('chai');
const expect = chai.expect;
const api = require('../api/apiWeek3');
const scenario = require('../scenarios/search-user');
const requestBody = require('../data/create-user.json');
const jsonSchema = require('../schemas/update-user-schema.json');

chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe("Search user for API Test", async () => {

    before(async () => {
        console.log("before hooks");
        let response = await api.postUser(requestBody);
        expect(response.status).to.equal(200);
    })

    after(async () => {
        console.log("after hooks");

    })

    beforeEach(async () => {
        console.log("before each hooks");

    })

    afterEach(async () => {
        console.log("after each hooks");
    })

    it('[@search-user-api] Verify get users API will return when using valid keyword', async () => {
        // starting for scripting
        let namaYgMauDiCari = 'Firnan';

        let response = await api.getUser(namaYgMauDiCari);
        let bodyData = response.body;
        expect(response.status).to.equal(200);
        //console.log(bodyData.data);
        expect(bodyData.data).contains.something.like({firstName: 'Firnan'});
        //expect(bodyData.data.length).to.equal(0);
    });
})