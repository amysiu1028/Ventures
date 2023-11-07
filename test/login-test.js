import chai from 'chai';
const expect = chai.expect;

//import functions from the data-model.js
// import { } from "../src/data-model.js";

//import data:
// import userSample from "../src/data/sampleData";
//have to add sample data

//maybe client and user?
import { screenLogin } from '../src/login';


describe('Login Test', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should get user login info', () => {
    const passWord = travel
    const num = 50
    console.log("num",num)
    const userName = traveler + num
    const login = screenLogin(userName,passWord)
    expect(login).to.equal('Welcome traveler50')
  });
//   it ('should not let user login if username or password input fields are empty', function() {
    
//     expect(variable).to.equal('Please enter both your username and password.')
//   });
});