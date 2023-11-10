

import { userID } from "./scripts.js"
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