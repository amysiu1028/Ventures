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
   console.log("currentDate",currentDate)
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
export const displaySpecificTravelerTrips = (trips, ID) => {
   //search parseInt more
   ID = parseInt(ID)
   const filterTripByID = trips.filter((traveler) => traveler.userID === ID)
   console.log("filteredTrips",filterTripByID)
   return filterTripByID
};

export const travelerPastTrips = (filteredTrip, date) => {
   const pastTrips = filteredTrip.filter((trip) => {
      // console.log("new Date(trip.date)",new Date(trip.date))
      // console.log("new Date(date)",new Date(date))
      return new Date(trip.date) < new Date(date)
   })
   console.log("pastTrips", pastTrips)
   return pastTrips
}

//QUESTION
//data set only has past trips, doesn't have upcoming trips 
//unless we add it as that...??
export const travelerUpcomingTrips = (filteredTrip, date) => {
   const upcomingTrips = filteredTrip.filter((trip) => {
      // console.log("new Date(trip.date)",new Date(trip.date))
      // console.log("new Date(date)",new Date(date))
      return new Date(trip.date) > new Date(date)
   })
   console.log("upcomingTrips", upcomingTrips)
   return upcomingTrips
}

export const travelerPendingTrips = (filteredTrip) => {
   const pendingTrips = filteredTrip.filter((trip) => trip.status = 'pending')
   console.log("pendingTrips",pendingTrips)
   return pendingTrips
}


//'Thu Nov 09 2023' split 
   //create an array of strings that correspond to each of the months
   //index + 1 
   //[ Jan, Feb, Mar, Apr, May, Jun, July ]
   // { Jan: 1, Feb: 2, }   
//filter by date -= > past and another for upcoming trips


//testing:
//1. test when successful user login
//2. test if there is a bad login, if there is no number, a40b
//3. test if there is 


// getUserID()
// `/(\d+)/` - used to mark the start of new pattern, in this case a: \d - digit character class, where `+` matches the preceding occurrences. `(  )` captures the group.


//.filter(Boolean): After splitting the string using the regular expression, the filter() method is used with the argument Boolean. In JavaScript, the filter() method creates a new array with all elements that pass the test implemented by the provided function. When Boolean is used as the argument, it acts as a truthy value filter, removing any falsy values from the array.

// In this context, the filter(Boolean) expression removes any empty strings from the array. In the example array ["traveler", "50", ""], the empty string "" is falsy, so it is removed, resulting in the final array ["traveler", "50"].

// var inputString = "traveler50";
// var parts = inputString.split(/(\d+)/).filter(Boolean); // Split using regex to capture numbers
// console.log(parts)


//handleLogin(userName,passWord, userID)
// if userNam, and password === "" -> NOt complete
//if userName === `traveler${userID}` && password === travel
   //showDashboard() - that will hide the login and show dashboard
   /// oR just login.classList.add(hidden)
//THIS IS Placed under when addEventListender button submit is clicked

//getUserID(loginUserName) 
//go into traveler.id -> for Each (element ) if username.value.includes(element) 
//then return userID????

//user ID - can use in the single traveler fetch 

