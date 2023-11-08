// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises } from './apiCalls';

console.log('This is the JavaScript entry file - your code begins here.');

//global variables:
let allTravelerData;
let singleTravelerData;

//querySelectors:
const loginButton = document.querySelector('.loginButton')

//addEventListeners:
window.addEventListener('DOMContentLoaded', function () {
    // Promise.all(fetchAllPromises).then((values) => {
    //     console.log("values[0].travelers",values[0].travelers)
    //     allTravelerData = values[0].travelers;

    // //view it on the console... to see what data! have to console.log in apiCalls
    // })
    
    // console.log("global var travelerData:",travelerData)

    //

})

loginButton.addEventListener("click",function(event) {
    event.preventDefault() //button under form always have to event.preventDefault

});
