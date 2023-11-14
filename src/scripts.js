import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//import functions?
import { fetchAllPromises, fetchSingleTravelerPromise, fetchPosts} from './apiCalls';
import { getUserID, handleLogin, getSpecificTravelerTrips, getTodaysDate, travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips,filterTripByYear, getTotalCostPerYear, costWithFee, calculateDuration, getDestinationID } from "./data-model";
import { loadDashboard, displayLoginErrorMessage, displayPastTrips, displayUpcomingTrips, displayPendingTrips, displayCostPerYear, displayUserName, displaySortedDestinations, clearInputs } from './domUpdates';

//global variables:
export let allTravelerData;
export let allTripsData;
export let allDestinataionData;
let userID;

export let tripsByID;
export let totalCostForNewTrip;
let duration;
export let selectedDestinationID;

//querySelectors:
const submitButton = document.querySelector('.submit-button');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const serverDownErrorMessage  = document.querySelector('.error-message') 
const yearDropdown = document.querySelector('.year-dropdown');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
const destinationDropdown = document.querySelector('.destination-dropdown');
const travelNumbersInput = document.getElementById('travel-numbers');
const addNewTripButton = document.querySelector('.add-trip-button');

//addEventListeners:
window.addEventListener('DOMContentLoaded', function () {
    Promise.all(fetchAllPromises)
        .then((values) => {
            allTravelerData = values[0].travelers;
            allTripsData = values[1].trips;
            allDestinataionData = values[2].destinations;
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
                serverDownErrorMessage.classList.add('hidden');
                tripsByID = getSpecificTravelerTrips(allTripsData,userID);
                const todaysDate = getTodaysDate();
                const pastTrips = travelerPastTrips(tripsByID,todaysDate);
                const upcomingTrips = travelerUpcomingTrips(tripsByID,todaysDate);
                console.log("upcoming",upcomingTrips)
                const pendingTrips = travelerPendingTrips(tripsByID);
                
                //show single traveler information:
                loadDashboard();
                displayUserName(singleTravelerValue);

                displayPastTrips(pastTrips, allDestinataionData);
                displayUpcomingTrips(upcomingTrips, allDestinataionData);
                displayPendingTrips(pendingTrips, allDestinataionData);

                //Add event listener for year selection:
                yearDropdown.addEventListener('change', function () {
                    const selectedYear = yearDropdown.value;
                    const filterTripsByChosenYear = filterTripByYear(tripsByID, selectedYear);
                    const totalCost = getTotalCostPerYear(filterTripsByChosenYear,allDestinataionData);
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
                        return startDateValue;
                    },
                });
            
                const endDatePicker = datepicker(endDateInput, {
                    minDate: new Date(),
                    onSelect: (instance, dateStr) => {
                        const date = new Date(dateStr);
                        endDateValue = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
                        endDateInput.value = endDateValue;
                        duration = calculateDuration(startDateValue, endDateValue, startDateInput.value, endDateInput.value);
                        resolve(singleTravelerValue);
                        return endDateValue;
                    },
                });  

                travelNumbersInput.addEventListener('input', function () {
                    const inputValue = travelNumbersInput.value;
                    if (!Number.isInteger(parseFloat(inputValue)) || parseInt(inputValue) < 1) {
                        alert('Please enter a valid whole number greater than zero.');
                        travelNumbersInput.value = ''; // Clear the input field
                    }
                });
                
                displaySortedDestinations(allDestinataionData);
                destinationDropdown.addEventListener('change', function() {
                    selectedDestinationID = parseInt(destinationDropdown.value);
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

                    fetchPosts(newTripData);
                    resolve(singleTravelerValue);
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
