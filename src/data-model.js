// import { allTripsData } from './scripts.js'
// import { trips } from "./data/sampleData.js"; 
// console.log("trips",trips)
//get user ID to use: we can use it in get singleTravelData
export const getUserID = (username) => {
   const pattern = /^traveler([1-9]|[1-4][0-9]|50)$/;
   //if pattern mataches the username input string
   if (pattern.test(username)) {
      let usernameParts = username.split(/(\d+)/).filter(Boolean)
      if (usernameParts.length === 2) {
         const id = usernameParts[1]
         if (id <= 50 && id >= 1) {
            return id
         }
      } 
   } else {
      return 'Please enter a valid username'
   }
}
//handleLogin 
export const handleLogin = (username, password, id) => {
   if (username === "" || password === "") {
      return "Please provide both username and password."
   } else if (username !== `traveler${id}` || password !== 'travel') {
      return "Invalid username and/or password. Please enter correct username and password"
   } else if (username === `traveler${id}` && password === 'travel') {
      return true
   }
};

export const getTodaysDate = () => {
   //new Date() is a constructor that creates a new Date object representing the current date and time.
   const currentDate = new Date(); //Thu Nov 09 2023
   //method to get the year from string
   const year = currentDate.getFullYear();
   //method to get the month
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   //method to get the date
   const date = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}/${month}/${date}`;
   return formattedDate
};

//how are we using the getsingleTraveler
// export function getSingleTraveler(allTripsData,userID)
//tripsData have to create a sample
export const displaySpecificTravelerTrips = (trips, id) => {
   //search parseInt more
   // ID = parseInt(ID)
   const filterTripByID = trips.filter((traveler) => traveler.userID === parseInt(id))
   return filterTripByID
};

export const travelerPastTrips = (filteredTrips, date) => {
   const pastTrips = filteredTrips.filter((trip) => {
      // console.log("new Date(trip.date)",new Date(trip.date))
      // console.log("new Date(date)",new Date(date))
      return new Date(trip.date) < new Date(date)
   })
   return pastTrips
}

//QUESTION
//data set only has past trips, doesn't have upcoming trips 
//unless we add it as that...??
export const travelerUpcomingTrips = (filteredTrips, date) => {
   const upcomingTrips = filteredTrips.filter((trip) => {
      return new Date(trip.date) > new Date(date)
   })
   return upcomingTrips
}

export const travelerPendingTrips = (filteredTrips) => {
   const pendingTrips = filteredTrips.filter((trip) => trip.status = 'pending')
   return pendingTrips
}

export const filterTripByYear = (filteredTrips,year) => {
   console.log("filteredTrips",filteredTrips)
   const filterByChosenYear = filteredTrips.filter((trip) => { 
      const getYear = new Date(trip.date).getFullYear
      console.log("getYear", getYear)
      return getYear.toString() === year
   })
   console.log("filterByChosenYear")
   return filterByChosenYear
}

// export const getTripsByYear = (filteredTrip) => {
//    const filteredTrip = filteredTrip.filter((trip) => )
// }
// export const calculateTotalCost = (filteredTrips, destinationData, id, year) => {
//    console.log("filteredTrips",filteredTrips)
//    console.log("destinationData",destinationData)
//    console.log("id",id)

// }

// export const calculateCostWithFee = (pastTrips)