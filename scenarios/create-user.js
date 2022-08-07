const testcase = {
    description: "[@createuser] Create user API Test",
    positive: {
        case1 : '[@positive] Create user with valid request data'
    },
    negative: {
        case1: '[@negative] Create user with age value 0 will return 400'
    }
   
};

module.exports = {
    testcase
}