import chai from 'chai';
const expect = chai.expect;

//import functions from the data-model.js
// import { } from "../src/data-model.js";

//import data:
// import userSample from "../src/data/sampleData";
//have to add sample data

//maybe client and user?



describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});


// const { createCard, evaluateGuess } = require('../src/card');

// describe('card', function() {
//   it('should be a function', function() {
//     expect(createCard).to.be.a('function');
//   });

//   it('should create a card and its properties', function() {
//     const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
//     expect(card.id).to.equal(1);
//     expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
//     expect(card.answers).to.deep.equal(['object', 'array', 'function']);
//     expect(card.correctAnswer).to.equal('object');
//   });  
// });
