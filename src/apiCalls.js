import { allTripsData } from "./scripts.js";
import { travelerUpcomingTrips, costForNewTrip, costWithFee, getTodaysDate } from "./data-model.js";
import { displayUpcomingTrips, displayNewTripCost } from "./domUpdates.js";
import { allDestinataionData } from "./scripts.js";

//querySelectors:
const errorMessage = document.querySelector('.error-message');
const upcomingTripsBox = document.querySelector('.upcoming-trips');

//all of them have ids
export const urls = [
    `http://localhost:3001/api/v1/travelers`, //get all travelers
    `http://localhost:3001/api/v1/trips`, //get all trips
    `http://localhost:3001/api/v1/destinations` //get all destinations
];

export const fetchAllPromises = urls.map((url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
});

export const fetchSingleTravelerPromise = (singleTravelerUrl) => {
    return fetch(singleTravelerUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message);
        });
};

//fetchPost request
export const fetchPosts = (newTrip) => {
    fetch ('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error (`${response.status}: Failed to fetch data`);
        }
        return response.json();
    })
    .then (newTrip => {
        allTripsData.push(newTrip);
        const todaysDate = getTodaysDate();
        const updatedTravelerUpcomingTrips = travelerUpcomingTrips(allTripsData, todaysDate);
        upcomingTripsBox.innerHTML = "";
        displayUpcomingTrips(updatedTravelerUpcomingTrips, allDestinataionData);
        const totalCostForNewTrip = costForNewTrip(newTrip.newTrip, allDestinataionData);
        const totalCostWithFee = costWithFee(totalCostForNewTrip);
        displayNewTripCost(totalCostWithFee);
    })
    .catch (error => {
        alert(error.message);
    });
};
