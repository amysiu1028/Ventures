// import { handleLogin, getUserID } from "./data-model";
import { travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips, displaySpecificTravelerTrips, getTodaysDate, filterTripByYear } from "./data-model";
import { allTripsData, userID, pendingTrips, pastTrips, upcomingTrips, totalCostForNewTrip, allDestinataionData } from "./scripts";
// console.log("DOM userID", userID)

//querySelectors:
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const loginErrorMessage = document.querySelector(".login-error-message");
const pastTripsBox = document.querySelector('.past-trips');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const totalCostStatement = document.querySelector('.total-cost-statement');
const helloUsername = document.querySelector('.hello-username');
const destinationDropdown = document.querySelector('.destination-dropdown');
const newTripCost = document.querySelector('.new-trip-cost')
// const totalCostForNewTrip = document.querySelector('.select-year-title')
// const loginErrorMessage = document.querySelector(".login-error-message");

//show login message errors
export function displayLoginErrorMessage(message) {
    loginErrorMessage.classList.remove("hidden");
    loginErrorMessage.innerText = message;
  }

//load dashboard
export function loadDashboard() {
    loginPage.classList.add('hidden')
    dashboardPage.classList.remove('hidden')
}

export const displayUserName = (singleTravelData) => {
  helloUsername.innerText = `Hello ${singleTravelData.name}`
}

export function displayPastTrips(pastTripsData, destinationData) {
  pastTripsBox.innerHTML += pastTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID)
    if (matchingDestinationByID) {
      return `
      <section class="trip-box">
        <img class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt}" />
        <h3 tabindex="0">Destination: ${matchingDestinationByID.destination}</h3>
        <h3 tabindex="0">Date: ${trip.date}</h3>
        <h3 tabindex="0">Duration: ${trip.duration}</h3>
        <h3 tabindex="0">Number of Travelers: ${trip.travelers}</h3>
        <h3 tabindex="0">Cost: have to calculate </h3>
        <h3 tabindex="0">Trip ID: ${trip.id}</h3>
      </section>
    `;
    }
  })
}

export function displayUpcomingTrips(upcomingTripsData, destinationData) {
  
  upcomingTripsBox.innerHTML += upcomingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID)

    if (matchingDestinationByID) {
      return `
      <section class="trip-box">
        <img class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt}" />
        <h3 tabindex="0">Destination: ${matchingDestinationByID.destination}</h3>
        <h3 tabindex="0">Date: ${trip.date}</h3>
        <h3 tabindex="0">Duration: ${trip.duration}</h3>
        <h3 tabindex="0">Number of Travelers: ${trip.travelers}</h3>
        <h3 tabindex="0">Cost: have to calculate </h3>
        <h3 tabindex="0">Trip ID: ${trip.id}</h3>
      </section>
    `;
    }
  })
}

export function displayPendingTrips(pendingTripsData,destinationData) {
  pendingTripsBox.innerHTML += pendingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID)

    if (matchingDestinationByID) {
      return `
      <section class="trip-box">
        <img class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt}" />
        <h3 tabindex="0">Destination: ${matchingDestinationByID.destination}</h3>
        <h3 tabindex="0">Date: ${trip.date}</h3>
        <h3 tabindex="0">Duration: ${trip.duration}</h3>
        <h3 tabindex="0">Number of Travelers: ${trip.travelers}</h3>
        <h3 tabindex="0">Cost: have to calculate </h3>
        <h3 tabindex="0">Trip ID: ${trip.id}</h3>
      </section>
    `;
    }
  })
}

export function displayCostPerYear(year,id, cost, costWithFee) {
  // const year = yearDropdown.value;
  const filteredByYear = filterTripByYear(id, year);
  // console.log("filterTripByYear",filteredByYear)
  if (filteredByYear.length > 0) {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerHTML = `<h3 tabindex="0"><strong>${year} Total Cost </strong>: $${costWithFee}</h3>
    `
    // <h3><strong>${year} Total cost</strong> (without travel agency fee): $${cost}</h3><br>
  } else {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerText = `You did not book any trips in this ${year}`
  }
}
 
export function displaySortedDestinations(destinationsData) {
  const sortedDestinations = destinationsData.sort((a, b) => {
    return a.destination.localeCompare(b.destination);
  });
  // Build the HTML content for the initial option
  let optionsHTML = '<option disabled selected>Select Destination</option>';
  // Add more options dynamically
  sortedDestinations.forEach(destination => {
    optionsHTML += `<option value="${destination.id}" tabindex="0">${destination.destination}</option>`;
  });
  // Set the HTML content to the select element
  destinationDropdown.innerHTML = optionsHTML;
};


export function displayNewTripCost(totalCostWithFee) {
  newTripCost.classList.remove('hidden');
  newTripCost.innerHTML += `<h4 class="new-trip-cost><strong>The estimated cost for this trip:</strong> $${totalCostWithFee} </h4>`;
}