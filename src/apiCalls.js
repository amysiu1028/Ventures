

import { userID } from "./scripts.js"
import { tripsByID } from "./scripts.js";
// console.log("userID", userID)

//querySelectors:
const errorMessage = document.querySelector('.errorMessage');

//id:
//<id> should be substituted for a number. For example, if you're trying to get traveler 50's info, you'd do http://localhost:3001/api/v1/travelers/50

//all of them have ids
export const urls = [
    `http://localhost:3001/api/v1/travelers`, //get all travelers
    `http://localhost:3001/api/v1/trips`, //get all trips
    `http://localhost:3001/api/v1/destinations` //get all destinations
]


export const fetchAllPromises = urls.map((url) => {
        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error (`${response.status}: Failed to fetch data`)
                }
                return response.json()
            })
            .then((data) => {
                // console.log("api:",data)
                return data;
            })
            .catch((error) => {
                console.error("Error occurred:", error.message)
            })
    });

export const fetchSingleTravelerPromise = (singleTravelerUrl) => {
    return fetch(singleTravelerUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`)
            }
            return response.json()
        })
        .then((data) => {
            // console.log("api:",data)
            return data;
        })
        .catch((error) => {
            console.error("Error occurred:", error.message)
        })
};

//fetchPost request

export const fetchPosts = (newTripData) => {
    fetch ('http://localhost:3001/api/v1/trips', {
      method: 'POST',
      body: JSON.stringify(newTripData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error (`${response.status}: Failed to fetch data`)
      }
        return response.json()
    })
    .then (postData => {
        console.log("postData",postData)
    })
    .catch (error => {
      alert(error.message)
    })
  }

//   export const sendDataToAPI = (tripsBycurrentUser, allDestinataionData, allTripsData) => {
//     // console.log("tripsByID",tripsByID)

    
//     // let ounces = parseInt(ouncesInput.value);
//     // if (!isNaN(new Date(dateInput.value)) && typeof ounces === 'number' && ounces <= 675 && ouncesInput.value) {
//       const api = {
//         id: this has to be added onto the trips data id where the last one has an id of 203.
//         userID: tripsBycurrentUser[0].id,
//         destinationID: I don't know how to get this... wihtout the destination data. If user chooses an id and it matches this one.
//         travelers: user input on number of travelers
//         date: user input on date 'YYYY/MM/DD'>, 
//         duration: calculated by const duration = calculateDuration(startDateValue, endDateValue);
//         status: since user is adding it, it'll be pending. 
//         suggestedActivities: [] (this stays empty)
//     }
//   }  