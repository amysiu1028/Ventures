
//querySelectors:
const errorMessage = document.querySelector('.errorMessage');

// export const urls = [
//     "http://localhost:3001/api/v1/travelers", //get all travelers
//     "http://localhost:3001/api/v1/travelers/<id> where<id> will be a number of a traveler’s id", //get single traveler
//     "http://localhost:3001/api/v1/trips", //get all trips
//     "http://localhost:3001/api/v1/destinations" //get all destinations
// ]
// export const fetchAllPromises = urls.map((url) => {
//         fetch(url)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error (`${response.status}: Failed to fetch data`)
//                 }
//                 return response.json()
//             })
//             .then((data) => {
//                 console.log("api:",data)
//                 return data;
//             })
//             .catch((error) => {
//                 if (error instanceof TypeError) {
//                     //this may need to change, where other things may need to be hidden.
//                     errorMessage.innerText = "‼️ Unable to connect to the server.    Please try again later. "
//                 } else {
//                     alert(error.message)
//                 }
//             })
//     })
