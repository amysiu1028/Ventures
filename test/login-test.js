import chai from 'chai';
const expect = chai.expect;

//import functions from the data-model.js
import { getUserID, handleLogin } from "../src/data-model.js";

describe('Mocha and Chai Test:', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe('getUserID Tests:', function() {
  it('should return userID', function () {
    const username = 'traveler50'; 
    const userID = getUserID(username);
    expect(userID).to.equal('50');
  });
  it('should return userID for mulitple userIDs from 1-50', function() {
    const username = 'traveler1'; 
    const userID = getUserID(username);
    expect(userID).to.equal('1');
  });
  it('should return message if username above 50 or invalid username entered', function () {
    const username = 'traveler200'
    const username1 = 'randomPassword'
    const username2 = 'traveler51'
    // const message = getUserID(username);
    expect(getUserID(username)).to.equal('Please enter a valid username');
    expect(getUserID(username1)).to.equal('Please enter a valid username');
    expect(getUserID(username2)).to.equal('Please enter a valid username');
  });
});

describe('handleLogin() Tests:', function() {
    let username, id, password;

    beforeEach(function () {
      //set up common variables before each test
      username = 'traveler50';
      id = getUserID(username);
      password = 'travel'
    });

  it('should return true if valid username from 1-50 and password entered', function() {
    const successfulLogin = handleLogin(username, password, id)
    expect(successfulLogin).to.equal(true);
  });

  it('should return true for another valid username from 1-50 and password entered', function() {
    const anotherUsername = 'traveler1';
    const anotherId = getUserID(anotherUsername);
    const anotherSuccessfulLogin = handleLogin(anotherUsername, password, anotherId)
    expect(anotherSuccessfulLogin).to.equal(true);
  });

  it('should return message when invalid username or password entered', function() {
    const invalidUsername = 'randomUsername';
    const invalidNumberUsername = 'traveler200';
    // const invalidUse
  })
});

  // it('should get user login info', () => {
  //   const passWord = travel
  //   const num = 50
  //   console.log("num",num)
  //   const userName = traveler + num
  //   const login = screenLogin(userName,passWord)
  //   expect(login).to.equal('Welcome traveler50')
  // });
//   it ('should not let user login if username or password input fields are empty', function() {
    
//     expect(variable).to.equal('Please enter both your username and password.')
//   });