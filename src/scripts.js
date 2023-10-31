// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?


console.log('This is the JavaScript entry file - your code begins here.');

//querySelectors:
const loginButton = document.querySelector('.loginButton')

//addEventListeners:

loginButton.addEventListener("click",function(event) {
    event.preventDefault() //button under form always have to event.preventDefault

});
