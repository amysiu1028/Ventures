import { travelerUpcomingTrips, costForNewTrip, costWithFee, getTodaysDate, travelerPendingTrips, getSpecificTravelerTrips, getUserID } from "./data-model.js";
import { displayUpcomingTrips, displayNewTripCost, displayPendingTrips } from "./domUpdates.js";
import { allTripsData, allDestinataionData, selectedDestinationID } from "./scripts.js";

//querySelectors:
// const errorMessage = document.querySelector('.error-message');
const upcomingTripsBox = document.querySelector('.upcoming-trips');
const pendingTripsBox = document.querySelector('.pending-trips');
const usernameInput = document.getElementById('username');


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
        console.log("newTrip",newTrip)
        allTripsData.push(newTrip.newTrip);
        console.log("all",allTripsData) //good

        const todaysDate = getTodaysDate();
        console.log("todays",todaysDate) //good
        const userID = getUserID(usernameInput.value);
        console.log("userID",userID) //good

        const newTripsByID = getSpecificTravelerTrips(allTripsData,userID);
        console.log("tripsByID",newTripsByID) //this funciton isn't working...

        const updatedTravelerUpcomingTrips = travelerUpcomingTrips(newTripsByID, todaysDate);
        console.log("updatedTravelerUpcomingTrips",updatedTravelerUpcomingTrips)
        const pendingTrips = travelerPendingTrips(newTripsByID);
        console.log("pendingTrips",pendingTrips)

        pendingTripsBox.innerHTML = "";
        upcomingTripsBox.innerHTML = "";

        displayPendingTrips(pendingTrips, allDestinataionData);
        displayUpcomingTrips(updatedTravelerUpcomingTrips, allDestinataionData);
        
        console.log("updatedTravelerUpcomingTrips",updatedTravelerUpcomingTrips);
        console.log("pendingTrips",pendingTrips);

        const totalCostForNewTrip = costForNewTrip(newTrip.newTrip, allDestinataionData);
        const totalCostWithFee = costWithFee(totalCostForNewTrip);

        console.log("totalCostWithFee",totalCostWithFee)
        console.log(" allDestinataionData", allDestinataionData)
        console.log(" selectedDestinationID", selectedDestinationID)
        displayNewTripCost(totalCostWithFee, allDestinataionData, selectedDestinationID);
        
    })
    .catch (error => {
        console.log(error.message);
    });
};
