export const getUserID = (username) => {
   const pattern = /^traveler([1-9]|[1-4][0-9]|50)$/;
   if (pattern.test(username)) {
      let usernameParts = username.split(/(\d+)/).filter(Boolean);
      if (usernameParts.length === 2) {
         const id = usernameParts[1];
         if (id <= 50 && id >= 1) {
            const idInt = parseInt(id)
            return idInt;
         }
      } 
   } else {
      return 'Please enter a valid username';
   }
};

export const handleLogin = (username, password, id) => {
   if (username === '' || password === '') {
      return 'Please provide both username and password.';
   } else if (username !== `traveler${id}` || password !== 'travel') {
      return 'Invalid username and/or password. Please enter correct username and password';
   } else if (username === `traveler${id}` && password === 'travel') {
      return true;
   }
};

export const getTodaysDate = () => {
   const currentDate = new Date();
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const date = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}/${month}/${date}`;
   return formattedDate;
};

export const getSpecificTravelerTrips = (trips, id) => {
   if (typeof id === 'string') {
      return `Please provide a valid username.`
   }
   const filterTripByID = trips.filter((traveler) => parseInt(traveler.userID) === parseInt(id))
   return filterTripByID;
};

export const travelerPastTrips = (filteredTrips, date) => {
   const pastTrips = filteredTrips.filter((trip) => {
      return new Date(trip.date) < new Date(date);
   });
   if (pastTrips.length === 0) {
      return `This user has no past trips`
   }
   return pastTrips;
};

export const travelerUpcomingTrips = (filteredTrips, date) => {
   const upcomingTrips = filteredTrips.filter((trip) => {
      return new Date(trip.date) >= new Date(date);;
   });
   if (upcomingTrips.length === 0) {
      return `This user has no upcoming trips`
   }
   return upcomingTrips;
};

export const travelerPendingTrips = (filteredTrips) => {
   const pendingTrips = filteredTrips.filter((trip) => trip.status === 'pending');
   if (pendingTrips.length === 0) {
      return `This user has no pending trips`
   }
   return pendingTrips;
};

export const filterTripByYear = (filteredTrips, year) => {
   const filterTripsByChosenYear = filteredTrips.filter((trip) =>  parseInt(new Date(trip.date).getFullYear().toString()) === year);
   if (filterTripsByChosenYear.length === 0) {
      return `This user has no trips in ${year}`
   }
   return filterTripsByChosenYear;
};

export const getTotalCostPerYear = (filterTripsByChosenYear,   destinationData) => {
   if (typeof filterTripsByChosenYear === 'string') {
      return `You did not book any trips in this year through Venture Travel`
   }

   let costObject = {
      flightCostPerTrip: [],
      totalLodgingCost: []
   };

   destinationData.filter((destination) => {
      filterTripsByChosenYear.forEach((element) => {
         if (destination.id === element.destinationID) {
            costObject.flightCostPerTrip.push(destination.estimatedFlightCostPerPerson * element.travelers);
            costObject.totalLodgingCost.push(destination.estimatedLodgingCostPerDay * element.duration);
         }
      });
   });

   let totalCost = Object.keys(costObject).reduce((cost, value) => {
      costObject[value].forEach((price) => {
         cost += price;
      });
      return cost;
   }, 0);

   return totalCost;
};

export const costWithFee = (cost) => {
   const costWithTenPercentFee = cost + (cost * 0.1);
   const roundedCost = costWithTenPercentFee.toFixed(2);
   return roundedCost;
};

export function calculateDuration(startDateValue, endDateValue, startDateInput, endDateInput) {
   let startDate, endDate;

   if (startDateInput && endDateInput) {
      startDate = new Date(endDateInput);
      endDate = new Date(startDateInput);
   } else if (startDateValue && endDateValue) {
      startDate = new Date(startDateValue);
      endDate = new Date(endDateValue);
   }

   if (startDate && endDate) {
      if (startDate.toDateString() === endDate.toDateString()) {
         return 1;
      }

      const duration = Math.abs(endDate - startDate);
      const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
      return days;
   }

   return 0;
}

export const getDestinationID = (destinationData, userChosenDestination) => {
   const userChosenID = parseInt(userChosenDestination);
   const findID = destinationData.find((place) => {
      return place.id === userChosenID;
   });
   return findID.id;
};

export const costForNewTrip = (newTripObject, destinationData) => {
   const tripInfo = destinationData.find((destination) => destination.id === newTripObject.destinationID);
   const costForTotalDays = newTripObject.duration * tripInfo.estimatedLodgingCostPerDay;
   const flightCostForEveryone = newTripObject.travelers * tripInfo.estimatedFlightCostPerPerson;
   const total = costForTotalDays + flightCostForEveryone;
   return total;
};
