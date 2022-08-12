const testcase = {
    description: "Update user for API Test",
    positive: {
        case1 : "Update Ocuppation and Nationality user with valid data"
    },
    negative: {
        case1: "Update Age into 0 will return 400",
        case2: "Update Hobbies into empty array will return 400",
        case3: "Update ID into null will return 404"
    }
};

const testcase2 = {
    description: "Create user for API Test",
    positive: {
        case1 : "Create user"
    }
};

module.exports = {
    testcase,
    testcase2
}