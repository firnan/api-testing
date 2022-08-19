const testcase = {
    description: "Update user for API Test",
    positive: {
        case1 : "[@update] Update Ocuppation and Nationality user with valid data"
    },
    negative: {
        case1: "[@updateage]Update Age into 0 will return 400",
        case2: "[@updatehobi] Update Hobbies into empty array will return 400",
        case3: "[@updateid] Update ID into null will return 404"
    }
};

const testcase2 = {
    description: "Create user for API Test",
    positive: {
        case1 : "[@create] Create user"
    }
};

module.exports = {
    testcase,
    testcase2
}