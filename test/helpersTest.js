const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers)
    const expectedUserID = "userRandomID";
    // Write your assert statement here
    assert.deepEqual(user, testUsers[expectedUserID]);
  });
  it('should return a user undefined when user is not in db', function() {
    const user = getUserByEmail("user77@example.com", testUsers)
    const expectedUserID = "undefined";
    // Write your assert statement here
    assert.notDeepEqual(user, expectedUserID);
  });

});