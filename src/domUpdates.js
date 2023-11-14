// import { handleLogin, getUserID } from './data-model';
import { filterTripByYear } from './data-model';

//querySelectors:
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const loginErrorMessage = document.querySelector('.login-error-message');
const pastTripsBox = document.querySelector('.past-trips');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const totalCostStatement = document.querySelector('.total-cost-statement');
const helloUsername = document.querySelector('.hello-username');
const destinationDropdown = document.querySelector('.destination-dropdown');
const newTripCost = document.querySelector('.new-trip-cost');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
//show login message errors
export function displayLoginErrorMessage(message) {
  loginErrorMessage.classList.remove('hidden');
  loginErrorMessage.innerText = message;
}

//load dashboard
export function loadDashboard() {
  loginPage.classList.add('hidden');
  dashboardPage.classList.remove('hidden');
}

export const displayUserName = (singleTravelData) => {
  helloUsername.innerText = `Hello ${singleTravelData.name}!`;
};

export function displayPastTrips(pastTripsData, destinationData) {
  pastTripsBox.innerHTML += pastTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}" />
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    }
  });
}

export function displayUpcomingTrips(upcomingTripsData, destinationData) {
  upcomingTripsBox.innerHTML += upcomingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}"/>
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    }
  });
}


export function displayPendingTrips(pendingTripsData, destinationData) {
  pendingTripsBox.innerHTML += pendingTripsData.map((trip) => {
    const matchingDestinationByID = destinationData.find((destination) => destination.id === trip.destinationID);
    if (matchingDestinationByID) {
      return `
        <section class="trip-box">
          <img tabindex="0" class="image-container" src="${matchingDestinationByID.image}" alt="${matchingDestinationByID.alt} in ${matchingDestinationByID.destination}"/>
          <h1 tabindex="0">Destination: ${matchingDestinationByID.destination}</h1>
          <h1 tabindex="0">Date: ${trip.date}</h1>
          <h1 tabindex="0">Duration: ${trip.duration}</h1>
          <h1 tabindex="0">Number of Travelers: ${trip.travelers}</h1>
          <h1 tabindex="0">Trip ID: ${trip.id}</h1>
        </section>
      `;
    }
  });
}

export function displayCostPerYear(year, filteredTripData, costWithFee) {
  console.log("year",year)
  console.log("fiteredTripByYear",filterTripByYear)
  console.log("costWithFee",costWithFee)
  const filteredByYear = filterTripByYear(filteredTripData, year);
  if (filteredByYear.length > 0) {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerHTML = `<h3 tabindex="0"><strong>${year} Total Cost </strong>: $${costWithFee}</h3>`;
  } else {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerText = `You did not book any trips in this ${year} through Venture Travel`;
  }
}

export function displaySortedDestinations(destinationsData) {
  const sortedDestinations = destinationsData.sort((a, b) => {
    return a.destination.localeCompare(b.destination);
  });
  let optionsHTML = '<option disabled selected>Select Destination</option>';
  sortedDestinations.forEach(destination => {
    optionsHTML += `<option value="${destination.id}" tabindex="0">${destination.destination}</option>`;
  });
  destinationDropdown.innerHTML = optionsHTML;
}

export function displayNewTripCost(newTrip,totalCostWithFee, destinationData, selectedDestinationID) {
  
  newTripCost.classList.remove('hidden');
  const matchingDestinationByID = destinationData.find((destination) => destination.id === selectedDestinationID);
  console.log("matchingDestinationByID,",matchingDestinationByID)
  if (matchingDestinationByID) {
    return newTripCost.innerHTML += `<h1 class="new-trip-statement"><strong>The estimated cost for ${newTrip.duration} days in ${matchingDestinationByID.destination} for ${newTrip.travelers} traveler/s is: </strong> $${totalCostWithFee} </h1>`;
  }

}
