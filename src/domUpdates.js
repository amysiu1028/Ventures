// import { handleLogin, getUserID } from "./data-model";
import { travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips } from "./data-model";
//querySelectors:
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const loginErrorMessage = document.querySelector(".login-error-message");
const pastTripsBox = document.querySelector('.past-trips');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');

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
  let pastTrips = travelerPastTrips(tripsByID,todaysDate)
  pastTripsBox.innerHTML = `<p>${pastTrips}</p>`
}

export function displayUpcomingTrips() {
  const upcomingTrips = travelerUpcomingTrips(tripsByID,todaysDate)
  pastTripsBox.innerHTML = `<p>${upcomingTrips}</p>`
}

export function displayPendingTrips() {
  const pendingTrips = travelerPendingTrips(tripsByID)
  pastTripsBox.innerHTML = `<p>${pendingTrips}</p>`
}