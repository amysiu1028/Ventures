//

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises, fetchSingleTravelerPromise } from './apiCalls';
import { getUserID, handleLogin, displaySpecificTravelerTrips, getTodaysDate, travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips, calculateTotalCost, filterTripByYear } from "./data-model";
import { loadDashboard, displayLoginErrorMessage, displayPastTrips, displayUpcomingTrips, displayPendingTrips } from './domUpdates';

// console.log('This is the JavaScript entry file - your code begins here.');

//global variables:
export let allTravelerData;
export let allTripsData;
let allDestinataionData;
let userID;
export let pastTrips;
export let upcomingTrips;
export let pendingTrips;

//querySelectors:
const submitButton = document.querySelector('.submitButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginErrorMessage = document.querySelector(".login-error-message");
const serverDownErrorMessage  = document.querySelector('.errorMessage') //change wheere it's used! And not sure if I want this html!
const yearDropdown = document.querySelector('.year-dropdown')
//addEventListeners:'
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(fetchAllPromises)
        .then((values) => {
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
                //change userName... with displayUserName function
                serverDownErrorMessage.classList.add('hidden');
                
                // const todaysDate = getTodaysDate();
                //use todaysDate as a parameter
                const tripsByID = displaySpecificTravelerTrips(allTripsData,userID);
                const todaysDate = getTodaysDate();

                //get past trip data:
                pastTrips = travelerPastTrips(tripsByID,todaysDate);
                
                //get upcoming trip data:
                upcomingTrips = travelerUpcomingTrips(tripsByID,todaysDate);
                
                //get pending data:
                pendingTrips = travelerPendingTrips(tripsByID);
                
                loadDashboard();

                displayPastTrips();
                displayUpcomingTrips();
                displayPendingTrips();

                //Add event listener for year selection:
                yearDropdown.addEventListener('change', function () {
                    const selectedYear = yearDropdown.value;
                    filterTripByYear(tripsByID, selectedYear);
                    // displayCostForYear(selectedYear);
                });
                //get total cost:
                // calculateTotalCost(tripsByID, allDestinataionData, userID)
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
