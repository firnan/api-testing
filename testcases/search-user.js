const chai = require('chai');
const expect = chai.expect;
//const expect = require('chai').expect;
const api = require('../api/fazztrackApi');
const data = require('../testdata/testdata');
const scenario = require('../scenarios/create-user');
const requestBody = require('../data/create-user');
const jsonSchema = require('../schemas/search-user-schema.json');

//urutan matters
chai.use(require('chai-like'));
chai.use(require('chai-things'));
chai.use(require('chai-json-schema'));

describe("Search users API Test", async () => {
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
    
    it("[@search-user-api] Seach user with valid keyword", async () => {
        let keyword = 'Firnan';
        let response = await api.getUser(keyword);
        expect(response.status).to.equal(200);
        expect(response.body.data).contains.something.like({firstName: 'Firnan'});
        expect(response.body).has.jsonSchema(jsonSchema);
    })
})