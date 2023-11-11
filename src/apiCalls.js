

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
    //   hydrationDataAll.push(json);
    //   console.log(hydrationDataAll, 'inside POST func')
    //   let newHydrationData = filterUserData(hydrationDataAll, currentUser); 
    //   let todaysHydrationDate = getLatestData(newHydrationData);
    //   console.log(todaysHydrationDate, 'should be newly added')
    //   let waterPerDayPerWeek = getLatestData(newHydrationData, 'week');
    //   console.log(waterPerDayPerWeek, 'should included 7 days');
    //   waterChartToDom.destroy(); //bc we imported from another file, we can't set that...
    //   let newWaterChartToDom = waterChart(waterPerDayPerWeek);
    //   displayWaterInfo(todaysHydrationDate, newWaterChartToDom);
    })
    .catch (error => {
      alert(error.message)
    })
  }

  export const sendDataToAPI = (userID) => {
    // let ounces = parseInt(ouncesInput.value);
    // if (!isNaN(new Date(dateInput.value)) && typeof ounces === 'number' && ounces <= 675 && ouncesInput.value) {
    //   const api = {
    //     id: <number>, 
    //     userID: userID,
    //     destinationID: <number>, 
    //     travelers: <number>, 
    //     date: <string 'YYYY/MM/DD'>, 
    //     duration: <number>, 
    //     status: <string 'approved' or 'pending'>, 
    //     suggestedActivities: <array of strings>
    }
      

      
//       fetchPosts(api);
//       return api;
//     } else {
//       errorEl.classList.toggle("hidden");
//       errorEl.innerText = 'One or more was inputted incorrectly: Incorrect date and/or unreasonable number';
//     }
//   }
  