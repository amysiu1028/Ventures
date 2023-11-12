export const getUserID = (username) => {
   const pattern = /^traveler([1-9]|[1-4][0-9]|50)$/;
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

export const displaySpecificTravelerTrips = (trips, id) => {
   //search parseInt more
   // ID = parseInt(ID)
   const filterTripByID = trips.filter((traveler) => parseInt(traveler.userID) === parseInt(id))
   return filterTripByID
};

export const travelerPastTrips = (filteredTrips, date) => {
   const pastTrips = filteredTrips.filter((trip) => {
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
   const filterTripsByChosenYear = filteredTrips.filter((trip) =>  new Date(trip.date).getFullYear().toString() === year)
   return filterTripsByChosenYear
};

// export const getDestinationIDsForTrip = (filterTripsByChosenYear) => {
//    filterTripsByChosenYear.
// }

///get destinationi for the filteredTrips by year 
// so that I can use it

export const getTotalCostPerYear = (filterTripsByChosenYear,destinationData) => {
   // console.log("filterTripsByChosenYear:",filterTripsByChosenYear)
   console.log("destinationData:",destinationData)


   // const allDestinationIDs = filterTripsByChosenYear.map((trip) => trip.destinationID)
   // console.log("allDestinationIDs",allDestinationIDs)

   let costObject = {
      // flightCostPerPerson: [],
      // lodgingPerDay: [],
      flightCostPerTrip: [],
      totalLodgingCost: []
   }

   destinationData.filter((destination) => {
      filterTripsByChosenYear.forEach((element) => {
         if (destination.id === element.destinationID) {
            // costObject.flightCostPerPerson.push(destination.estimatedFlightCostPerPerson);
            // costObject.lodgingPerDay.push(destination.estimatedLodgingCostPerDay);
            costObject.flightCostPerTrip.push(destination.estimatedFlightCostPerPerson * element.travelers)
            costObject.totalLodgingCost.push(destination.estimatedLodgingCostPerDay * element.duration)
         }
      })
   })
   console.log("costObject",costObject);
   
   // const totalCost = 
   const totalCost = Object.keys(costObject).reduce((cost,value) => {
      costObject[value].forEach((price) => {
         cost += price
      })
      return cost
      // console.log(costObject[values].flightCostPerPerson)
   },0)
   // console.log("totalcost", totalCost)
   return totalCost
   // return costObject
}

export const costWithFee = (cost) => {
   const costWithTenPercentFee = cost + (cost * 0.1)
   const roundedCost = costWithTenPercentFee.toFixed(2)
   return roundedCost
}

export function calculateDuration(startDateValue, endDateValue) {
   if (startDateValue && endDateValue) {
       const startDate = new Date(startDateValue);
       const endDate = new Date(endDateValue);
       if (startDate.toDateString() === endDate.toDateString()) {
         return 1;
     }
       const duration = Math.abs(endDate - startDate); // in milliseconds
       const days = Math.ceil(duration / (1000 * 60 * 60 * 24)); // convert milliseconds to days
       return days
      //  console.log("Duration in days:", days);
       // You can use 'days' as needed for your application
   }
}

export const getDestinationID = (destinataionData,userChosenDestination) => {
   const userChosenID = parseInt(userChosenDestination)
   const findID = destinataionData.find((place) => {
      return place.id === userChosenID
   })
   return findID.id
}