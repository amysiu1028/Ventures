// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises } from './apiCalls';

// console.log('This is the JavaScript entry file - your code begins here.');

//global variables:
let allTravelerData;
let allTripsData;
let allDestinataionData;
// let singleTravelerData;

//querySelectors:
const loginButton = document.querySelector('.loginButton')

//addEventListeners:'
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(fetchAllPromises)
        .then((values) => {
            console.log("values",values)
        //data from web API:
            allTravelerData = values[0].travelers;
            console.log("global var travelerData:",allTravelerData)
            allTripsData = values[1].trips;
            allDestinataionData = values[2].destinations;
     })
     .catch((error) => {
        console.error("Error occurred:", error.message);
     });
})


loginButton.addEventListener("click",function(event) {
    event.preventDefault() //button under form always have to event.preventDefault

});
