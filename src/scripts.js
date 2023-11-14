//

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises, fetchSingleTravelerPromise, fetchPosts} from './apiCalls';
import { getUserID, handleLogin, getSpecificTravelerTrips, getTodaysDate, travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips, calculateTotalCost, filterTripByYear, getTotalCostPerYear, costWithFee, calculateDuration, getDestinationID, costForNewTrip } from "./data-model";
import { loadDashboard, displayLoginErrorMessage, displayPastTrips, displayUpcomingTrips, displayPendingTrips, displayCostPerYear, displayUserName, displaySortedDestinations, displayNewTripCost } from './domUpdates';
// import flatpicnpm inkr from 'flatpickr';
// import datepicker from 'js-datepicker';
// import datepicker from 'js-datepicker';



// console.log('This is the JavaScript entry file - your code begins here.');

//global variables:
export let allTravelerData;
export let allTripsData;
export let allDestinataionData;
let userID;
console.log("userID",userID)

export let tripsByID;
export let totalCostForNewTrip;
let duration;
// let newTripData;   

//querySelectors:
const submitButton = document.querySelector('.submit-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginErrorMessage = document.querySelector(".login-error-message");
const serverDownErrorMessage  = document.querySelector('.error-message') //change wheere it's used! And not sure if I want this html!
const yearDropdown = document.querySelector('.year-dropdown');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
const destinationDropdown = document.querySelector('.destination-dropdown');
const travelNumbersInput = document.getElementById('travel-numbers');
const addNewTripButton = document.querySelector('.add-trip-button');

//addEventListeners:'
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(fetchAllPromises)
        .then((values) => {
            // Data from web API:
            allTravelerData = values[0].travelers;
            allTripsData = values[1].trips;
            allDestinataionData = values[2].destinations;
            // console.log('Initializing Flatpickr on:', dateInput);
             // const picker = datepicker(selector, options)
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
});


submitButton.addEventListener("click",function(event) {
    event.preventDefault() 
    userID = getUserID(usernameInput.value);

    const loginResult = handleLogin(usernameInput.value, passwordInput.value, userID);
    if (loginResult === true) {
        new Promise((resolve,reject) => {
            fetchSingleTravelerPromise(`http://localhost:3001/api/v1/travelers/${userID}`)
            .then((singleTravelerValue) => {
                //change userName... with displayUserName function
                serverDownErrorMessage.classList.add('hidden');

                // const todaysDate = getTodaysDate();
                //use todaysDate as a parameter
                tripsByID = getSpecificTravelerTrips(allTripsData,userID);
                console.log("tripsByID",tripsByID)
                const todaysDate = getTodaysDate();

                //get past trip data:
                const pastTrips = travelerPastTrips(tripsByID,todaysDate);
                
                //get upcoming trip data:
                const upcomingTrips = travelerUpcomingTrips(tripsByID,todaysDate);

                //get pending data:
                const pendingTrips = travelerPendingTrips(tripsByID);
                //show single traveler information:
                displayUserName(singleTravelerValue);
                loadDashboard();
                console.log("pastTrips",pastTrips)
                displayPastTrips(pastTrips, allDestinataionData);
                
                console.log("upcomingTrips",upcomingTrips)
                displayUpcomingTrips(upcomingTrips, allDestinataionData);
                
                console.log("pendingTrips", pendingTrips)
                displayPendingTrips(pendingTrips, allDestinataionData);

                //Add event listener for year selection:
                yearDropdown.addEventListener('change', function () {
                    const selectedYear = yearDropdown.value;
                    console.log("selectedYear,",selectedYear)
                    console.log("tripsByID",tripsByID)
                    const filterTripsByChosenYear = filterTripByYear(tripsByID, selectedYear);
                    console.log("filterTripsByChosenYear",filterTripsByChosenYear);
                    const totalCost = getTotalCostPerYear(filterTripsByChosenYear,allDestinataionData);
                    console.log("totalCost",totalCost)
                    const addFeeCost = costWithFee(totalCost);
                    displayCostPerYear(selectedYear,tripsByID,addFeeCost);
                });

                let startDateValue;
                let endDateValue;
                let findDesinationID;
                
                const startDatePicker = datepicker(startDateInput, {
                    minDate: new Date(),
                    onSelect: (instance, dateStr) => {
                        const date = new Date(dateStr);
                        startDateValue = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                        startDateInput.value = startDateValue;
                        console.log("startDateValue", startDateValue);
                        resolve(singleTravelerValue);
                        return startDateValue;
                    },
                });
            
                const endDatePicker = datepicker(endDateInput, {
                    minDate: new Date(),
                    onSelect: (instance, dateStr) => {
                        const date = new Date(dateStr);
                        endDateValue = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                        endDateInput.value = endDateValue;
                        console.log("endDateValue", endDateValue);
                        duration = calculateDuration(startDateValue, endDateValue, startDateInput.value, endDateInput.value);
                        console.log("days", duration);
                        resolve(singleTravelerValue);
                        return endDateValue;
                    },
                });  

                travelNumbersInput.addEventListener('input', function () {
                    const inputValue = travelNumbersInput.value;
                    if (!Number.isInteger(parseFloat(inputValue)) || parseInt(inputValue) < 1) {
                        // Display an error message or take appropriate action
                        alert('Please enter a valid whole number greater than zero.');
                        travelNumbersInput.value = ''; // Clear the input field
                    }
                });
                
                displaySortedDestinations(allDestinataionData);
                destinationDropdown.addEventListener('change', function() {
                    const selectedDestinationID = destinationDropdown.value;
                    console.log('Selected Destination ID:', selectedDestinationID);
                    findDesinationID = getDestinationID(allDestinataionData,selectedDestinationID)
                })
                
                ///THIS IS WHERE I WILL PUT POST request under an addeventlistener
                addNewTripButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    const travelers = parseInt(travelNumbersInput.value);
                    duration = calculateDuration(startDateValue, endDateValue, startDateInput.value, endDateInput.value);
                    const nextID = allTripsData.length + 1; 
                    
                    // userID = parseInt(userID)

                    const newTripData = {
                        id: nextID,
                        userID: userID,
                        destinationID: findDesinationID,
                        travelers: travelers,
                        date: startDateValue || startDateInput.value,
                        duration: duration,
                        status: 'pending',
                        suggestedActivities: []
                    };

                    fetchPosts(newTripData) 
                })
            })
            .catch((error) => {
                reject(error)
            })
        })
    } else if (typeof loginResult === 'string') {
        displayLoginErrorMessage(loginResult)
    }
});
