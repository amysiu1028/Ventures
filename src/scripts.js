//

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises, fetchSingleTravelerPromise } from './apiCalls';
import { getUserID, handleLogin, displaySpecificTravelerTrips, getTodaysDate, travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips } from "./data-model";
import { loadDashboard, displayLoginErrorMessage, displayPastTrips, displayUpcomingTrips, displayPendingTrips } from './domUpdates';

// console.log('This is the JavaScript entry file - your code begins here.');

//global variables:
export let allTravelerData;
export let allTripsData;
let allDestinataionData;
let userID;
// console.log("userID", userID)
// let pastTrips;

//fetch()
// export const singleTravelerUrl = 

// let singleTravelerData;

//querySelectors:
const submitButton = document.querySelector('.submitButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginErrorMessage = document.querySelector(".login-error-message");

//addEventListeners:'
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(fetchAllPromises)
        .then((values) => {
            console.log("values",values)
        //data from web API:
            allTravelerData = values[0].travelers;
            allTripsData = values[1].trips;
            allDestinataionData = values[2].destinations;
     })
     .catch((error) => {
        console.error("Error occurred:", error.message);
     });

     
  
})

submitButton.addEventListener("click",function(event) {
    event.preventDefault() 
    userID = getUserID(usernameInput.value);
    const loginResult = handleLogin(usernameInput.value, passwordInput.value, userID);
    if (loginResult === true) {
        new Promise((resolve,reject) => {
            fetchSingleTravelerPromise(`http://localhost:3001/api/v1/travelers/${userID}`)
            .then((singleTravelerValues) => {
                const todaysDate = getTodaysDate();
                //use todaysDate as a parameter
                loadDashboard();
                const tripsByID = displaySpecificTravelerTrips(allTripsData,userID);

                //show past trips:
                travelerPastTrips(tripsByID,todaysDate);
                displayPastTrips();

                //show upcoming trips:
                travelerUpcomingTrips(tripsByID,todaysDate);
                displayUpcomingTrips();

                //show pending trips:
                travelerPendingTrips(tripsByID);
                displayPendingTrips();
                //will post new upcoming trips
                resolve(singleTravelerValues);
            })
            .catch((error) => {
                reject(error)
            })
        })
    } else if (typeof loginResult === 'string') {
        displayLoginErrorMessage(loginResult)
    }
});


//separate function invoking somewhere else:
//when user logins, create a Date.now
//as it brings up data
//user has the user.date and compare it to Date.now

//date formatter
//"2019/11/16"