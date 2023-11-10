// import { handleLogin, getUserID } from "./data-model";
import { travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips, displaySpecificTravelerTrips, getTodaysDate, filterTripByYear } from "./data-model";
import { allTripsData, userID, pendingTrips, pastTrips, upcomingTrips } from "./scripts";
// console.log("DOM userID", userID)

//querySelectors:
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const loginErrorMessage = document.querySelector(".login-error-message");
const pastTripsBox = document.querySelector('.past-trips');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const totalCostStatement = document.querySelector('.total-cost-statement')
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

export function displayPastTrips() {
  // const todaysDate = getTodaysDate();
  // const tripsByID = displaySpecificTravelerTrips(allTripsData,userID);
  // let pastTrips = travelerPastTrips(tripsByID,todaysDate)
  // console.log("pastTrips DOM",pastTrips)
  pastTripsBox.innerHTML = pastTrips.map((trip) => `
  <section class="trip-box">
    <h3>Destination: ${trip.destinationID}</h3>
    <h3>Date: ${trip.date}</h3>
    <h3>Number of Travelers: ${trip.travelers}</h3>
    <h3>Cost: have to calculate </h3>
    <h3>Trip ID: ${trip.id}</h3>
  </section>
`).join('');
}

export function displayUpcomingTrips() {
  // const todaysDate = getTodaysDate();
  // const tripsByID = displaySpecificTravelerTrips(allTripsData,userID);
  // const upcomingTrips = travelerUpcomingTrips(tripsByID,todaysDate)
  console.log("upcoming trips DOM", upcomingTrips)
  // upcomingTripsBox.innerHTML += `<p>${upcomingTrips}</p>`
  upcomingTripsBox.innerHTML = upcomingTrips.map((trip) => `
  <section class="trip-box">
    <h3>Destination: ${trip.destinationID}</h3>
    <h3>Date: ${trip.date}</h3>
    <h3>Number of Travelers: ${trip.travelers}</h3>
    <h3>Cost: have to calculate </h3>
    <h3>Trip ID: ${trip.id}</h3>
  </section>
`).join('');
}

export function displayPendingTrips() {
  // const tripsByID = displaySpecificTravelerTrips(allTripsData,userID);
  // const pendingTrips = travelerPendingTrips(tripsByID)
  console.log("pending trips DOM", pendingTrips)
  // pendingTripsBox.innerHTML += `<p>${pendingTrips}</p>`
  pendingTripsBox.innerHTML = pendingTrips.map((trip) => `
  <section class="trip-box">
    <h3>Destination: ${trip.destinationID}</h3>
    <h3>Date: ${trip.date}</h3>
    <h3>Number of Travelers: ${trip.travelers}</h3>
    <h3>Cost: have to calculate </h3>
    <h3>Trip ID: ${trip.id}</h3>
  </section>
`).join('');
}

export function displayCostPerYear(year,id) {
  const filteredByYear = filterTripByYear(id, year);
  // console.log("filterTripByYear",filteredByYear)
  if (filteredByYear.length > 0) {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerText = `Your total cost is: $ (caculatedtotalcost)`
  } else {
    totalCostStatement.classList.remove('hidden');
    totalCostStatement.innerText = `You did not book any trips in this ${year}`
}
}