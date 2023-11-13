import chai from 'chai';
const expect = chai.expect;

//import functions from the data-model.js
import { getUserID, handleLogin, getTodaysDate, getSpecificTravelerTrips, travelerPastTrips, travelerUpcomingTrips, travelerPendingTrips, filterTripByYear, getTotalCostPerYear } from "../src/data-model.js";

describe('Mocha and Chai Test:', () => {
  it('should return true', () => {
    expect(true).to.equal(true);
  });
});

describe('getUserID Tests:', () => {
  it('should return userID', () => {
    const username = 'traveler50'; 
    const userID = getUserID(username);
    expect(userID).to.equal(50);
  });
  it('should return userID for mulitple userIDs from 1-50', () => {
    const username = 'traveler1'; 
    const userID = getUserID(username);
    expect(userID).to.equal(1);
  });
  it('should return message if username above 50 or invalid username entered', () => {
    const username = 'traveler200'
    const username1 = 'randomPassword'
    const username2 = 'traveler51'
    // const message = getUserID(username);
    expect(getUserID(username)).to.equal('Please enter a valid username');
    expect(getUserID(username1)).to.equal('Please enter a valid username');
    expect(getUserID(username2)).to.equal('Please enter a valid username');
  });
});

describe('handleLogin() Tests:', () => {
    let username, id, password;

    beforeEach(() => {
      //set up common variables before each test
      username = 'traveler50';
      id = getUserID(username);
      password = 'travel'
    });

  it('should return true if valid username from 1-50 and password entered', () => {
    const successfulLogin = handleLogin(username, password, id)

    expect(successfulLogin).to.equal(true);
  });

  it('should return true for another valid username from 1-50 and password entered', () => {
    const anotherUsername = 'traveler1';
    const anotherId = getUserID(anotherUsername);
    const anotherSuccessfulLogin = handleLogin(anotherUsername, password, anotherId)

    expect(anotherSuccessfulLogin).to.equal(true);
  });

  it('should return message when invalid username or password entered', () => {
    const invalidUsername = 'randomUsername';
    const invalidPassword = 'invalidPassord';

    // const invalidUse
    const invalidUsernameLogin = handleLogin(invalidUsername, password, id);
    const invalidUserNameAndPassword = handleLogin(invalidUsername, invalidPassword, id);
    const invalidPasswordLogin = handleLogin(username, invalidPassword, id);

    expect(invalidUsernameLogin).to.equal('Invalid username and/or password. Please enter correct username and password');
    expect(invalidUserNameAndPassword).to.equal('Invalid username and/or password. Please enter correct username and password');
    expect(invalidPasswordLogin).to.equal('Invalid username and/or password. Please enter correct username and password');
  })
});

describe('getTodaysDate Tests:', () => {
  it('should return a string in the format "yyyy/mm/dd after successful user log in', () => {
  const result = getTodaysDate()
  expect(result).to.match(/^\d{4}\/\d{2}\/\d{2}$/)
  })
});

describe('Traveler Functions Tests:', () =>  {
  let trips, username, id, date, tripsWithoutID
  beforeEach(() => {
    username = 'traveler5';
    id = getUserID(username);
    date = '2023/11/13';
    trips = [
      {"id": 117, "userID": 1, "destinationID": 28, "travelers": 3, "date": "2021/01/09", "duration": 15, "status": "approved", "suggestedActivities": []},
      {"id": 236, "userID": 1, "destinationID": 33, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 246, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 247, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 248, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2025/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 263, "userID": 3, "destinationID": 30, "travelers": 1, "date": "2025/11/13", "duration": 6, "status": "pending", "suggestedActivities": []},
      {"id": 264, "userID": 3, "destinationID": 45, "travelers": 1, "date": "2024/01/01", "duration": 4, "status": "pending", "suggestedActivities": []},
      {"id": 265, "userID": 3, "destinationID": 16, "travelers": 1, "date": "2023/11/12", "duration": 14, "status": "pending", "suggestedActivities": []},
      {"id": 187, "userID": 43, "destinationID": 14, "travelers": 3, "date": "2020/11/12", "duration": 18, "status": "approved", "suggestedActivities": []},
      {"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []},
      {"id": 91, "userID": 5, "destinationID": 5, "travelers": 1, "date": "2020/04/29", "duration": 16, "status": "approved", "suggestedActivities": []},
      {"id": 163, "userID": 5, "destinationID": 48, "travelers": 1, "date": "2020/04/28", "duration": 10, "status": "approved", "suggestedActivities": []},
      {"id": 191, "userID": 6, "destinationID": 47, "travelers": 5, "date": "2019/08/17", "duration": 19, "status": "approved", "suggestedActivities": []},
      {"id": 76, "userID": 7, "destinationID": 17, "travelers": 5, "date": "2019/10/22", "duration": 20, "status": "approved", "suggestedActivities": []},
      {"id": 77, "userID": 7, "destinationID": 46, "travelers": 5, "date": "2020/05/28", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 97, "userID": 7, "destinationID": 3, "travelers": 3, "date": "2020/08/20", "duration": 4, "status": "approved", "suggestedActivities": []},
      {"id": 98, "userID": 7, "destinationID": 12, "travelers": 6, "date": "2020/10/6", "duration": 16, "status": "pending", "suggestedActivities": []},
      {"id": 106, "userID": 9, "destinationID": 34, "travelers": 5, "date": "2020/06/08", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 107, "userID": 8, "destinationID": 19, "travelers": 3, "date": "2020/06/02", "duration": 6, "status": "approved", "suggestedActivities": []}
    ];
    tripsWithoutID = [
      {"id": 98, "userID": 7, "destinationID": 12, "travelers": 6, "date": "2020/10/6", "duration": 16, "status": "pending", "suggestedActivities": []},
      {"id": 106, "userID": 9, "destinationID": 34, "travelers": 5, "date": "2020/06/08", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 107, "userID": 8, "destinationID": 19, "travelers": 3, "date": "2020/06/02", "duration": 6, "status": "approved", "suggestedActivities": []}
    ]
  });

  it('getSpecificTravelerTrips function should filter trips data by specific user login id that exists in trips data', () => {
    const filterTripByIDResult = getSpecificTravelerTrips(trips, id);

    expect(filterTripByIDResult).to.deep.equal([{"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []},
    {"id": 91, "userID": 5, "destinationID": 5, "travelers": 1, "date": "2020/04/29", "duration": 16, "status": "approved", "suggestedActivities": []}, {"id": 163, "userID": 5, "destinationID": 48, "travelers": 1, "date": "2020/04/28", "duration": 10, "status": "approved", "suggestedActivities": []}])
  });
  
  it('getSpecificTravelerTrips function should filter through trips data and return invalid entry if user login id does not exist in trips dataset', () => {
    const invalidUsername = 'traveler51';
    const invalidID = getUserID(invalidUsername);
    const filterTripByInvalidID = getSpecificTravelerTrips(trips, invalidID)

    expect(filterTripByInvalidID).to.equal('Please provide a valid username.')
  })

  it('travelerPastTrips function should should filter the specific user trips data by the log in date and return all past trips from that date', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const pastTrips = travelerPastTrips(filteredTrips, date)

    expect(pastTrips).to.deep.equal([{"id": 91, "userID": 5, "destinationID": 5, "travelers": 1, "date": "2020/04/29", "duration": 16, "status": "approved", "suggestedActivities": []}, {"id": 163, "userID": 5, "destinationID": 48, "travelers": 1, "date": "2020/04/28", "duration": 10, "status": "approved", "suggestedActivities": []}])
  })

  it('travelerPastTrips function should should return a message if there are no trips by user id', () => {
    const filteredTrips = getSpecificTravelerTrips(tripsWithoutID, id)
    const pastTrips = travelerPastTrips(filteredTrips, date)

    expect(pastTrips).to.deep.equal(`This user has no past trips`)
  })

  it('travelerUpcomingTrips function should should filter the specific user trips data by the log in date and return all upcoming trips from that date', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const upcomingTrips = travelerUpcomingTrips(filteredTrips, date)

    expect(upcomingTrips).to.deep.equal([{"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []}])
  })

  it('travelerUpcomingTrips function should should return a message if there are no trips by user id', () => {
    const filteredTrips = getSpecificTravelerTrips(tripsWithoutID, id)
    const upcomingTrips = travelerUpcomingTrips(filteredTrips, date)

    expect(upcomingTrips).to.deep.equal(`This user has no upcoming trips`)
  })

  it('travelerPendingTrips function should should filter the specific user trips data by the log in date and return all pending trips from that date', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const pendingTrips = travelerPendingTrips(filteredTrips)

    expect(pendingTrips).to.deep.equal([{"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []}])
  })

  it('travelerPendingTrips function should should return a message if there are no trips by user id', () => {
    const filteredTrips = getSpecificTravelerTrips(tripsWithoutID, id)
    const pendingTrips = travelerPendingTrips(filteredTrips)

    expect(pendingTrips).to.deep.equal(`This user has no pending trips`)
  })
});

describe('Calculate Cost functions:', () => {
  let username, id, year, trips, destinationData;

  beforeEach(() => {
    username = 'traveler5';
    id = getUserID(username);
    year = 2020;
    trips = [
      {"id": 117, "userID": 1, "destinationID": 28, "travelers": 3, "date": "2021/01/09", "duration": 15, "status": "approved", "suggestedActivities": []},
      {"id": 236, "userID": 1, "destinationID": 33, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 246, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 247, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 248, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2025/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 263, "userID": 3, "destinationID": 30, "travelers": 1, "date": "2025/11/13", "duration": 6, "status": "pending", "suggestedActivities": []},
      {"id": 264, "userID": 3, "destinationID": 45, "travelers": 1, "date": "2024/01/01", "duration": 4, "status": "pending", "suggestedActivities": []},
      {"id": 265, "userID": 3, "destinationID": 16, "travelers": 1, "date": "2023/11/12", "duration": 14, "status": "pending", "suggestedActivities": []},
      {"id": 187, "userID": 43, "destinationID": 14, "travelers": 3, "date": "2020/11/12", "duration": 18, "status": "approved", "suggestedActivities": []},
      {"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []},
      {"id": 91, "userID": 5, "destinationID": 5, "travelers": 1, "date": "2020/04/29", "duration": 16, "status": "approved", "suggestedActivities": []},
      {"id": 163, "userID": 5, "destinationID": 48, "travelers": 1, "date": "2020/04/28", "duration": 10, "status": "approved", "suggestedActivities": []},
      {"id": 191, "userID": 6, "destinationID": 47, "travelers": 5, "date": "2019/08/17", "duration": 19, "status": "approved", "suggestedActivities": []},
      {"id": 76, "userID": 7, "destinationID": 17, "travelers": 5, "date": "2019/10/22", "duration": 20, "status": "approved", "suggestedActivities": []},
      {"id": 77, "userID": 7, "destinationID": 46, "travelers": 5, "date": "2020/05/28", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 97, "userID": 7, "destinationID": 3, "travelers": 3, "date": "2020/08/20", "duration": 4, "status": "approved", "suggestedActivities": []},
      {"id": 98, "userID": 7, "destinationID": 12, "travelers": 6, "date": "2020/10/6", "duration": 16, "status": "pending", "suggestedActivities": []},
      {"id": 106, "userID": 9, "destinationID": 34, "travelers": 5, "date": "2020/06/08", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 107, "userID": 8, "destinationID": 19, "travelers": 3, "date": "2020/06/02", "duration": 6, "status": "approved", "suggestedActivities": []}
    ];
    destinationData = [
      { "id": 4, "destination": "Cartagena, Colombia", "estimatedLodgingCostPerDay": 65, "estimatedFlightCostPerPerson": 350, "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80", "alt": "boats at a dock during the day time" },
      { "id": 5, "destination": "Madrid, Spain", "estimatedLodgingCostPerDay": 150, "estimatedFlightCostPerPerson": 650, "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "city with clear skies and a road in the daytime" },
      { "id": 6, "destination": "Jakarta, Indonesia", "estimatedLodgingCostPerDay": 70, "estimatedFlightCostPerPerson": 890, "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "lit up city at night" },
      { "id": 7, "destination": "Paris, France", "estimatedLodgingCostPerDay": 100, "estimatedFlightCostPerPerson": 395, "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80", "alt": "city during the daytime with Eiffel Tower" },
      { "id": 8, "destination": "Tokyo, Japan", "estimatedLodgingCostPerDay": 125, "estimatedFlightCostPerPerson": 1000, "image": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80", "alt": "city with people walking in crosswalk and brightly lit shops at night" },
      { "id": 9, "destination": "Amsterdam, Netherlands", "estimatedLodgingCostPerDay": 100, "estimatedFlightCostPerPerson": 950, "image": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "canal with boats and trees and buildings along the side" },
      { "id": 10, "destination": "Toronto, Canada", "estimatedLodgingCostPerDay": 90, "estimatedFlightCostPerPerson": 450, "image": "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80" },
      { "id": 11, "destination": "Mikonos, Greece", "estimatedLodgingCostPerDay": 140, "estimatedFlightCostPerPerson": 1000, "image": "https://images.unsplash.com/photo-1573783309724-e44b859f5a85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80", "alt": "cityscape along the water during the day" },
      { "id": 12, "destination": "Wellington, New Zealand", "estimatedLodgingCostPerDay": 150, "estimatedFlightCostPerPerson": 1200, "image": "https://images.unsplash.com/photo-1442483221814-59f7d8b22739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "overview of city with buildings, water and trees" },
      { "id": 13, "destination": "St. Petersburg, Russia", "estimatedLodgingCostPerDay": 100, "estimatedFlightCostPerPerson": 1100, "image": "https://images.unsplash.com/photo-1556543697-2fb00d31948a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "buildings and people crossing the street carrying shopping bags during the day" },
      { "id": 14, "destination": "Marrakesh, Morocco", "estimatedLodgingCostPerDay": 70, "estimatedFlightCostPerPerson": 830, "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80", "alt": "people buying oranges and other fruit from a street vendor" },
      { "id": 15, "destination": "Manila, Philippines", "estimatedLodgingCostPerDay": 40, "estimatedFlightCostPerPerson": 900, "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80", "alt": "colorful buildings near the water with docked boats" },
      { "id": 16, "destination": "Bangkok, Thailand", "estimatedLodgingCostPerDay": 35, "estimatedFlightCostPerPerson": 988, "image": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80", "alt": "ornate buildings with a garden during the day" }
    ];
      trips = [
      {"id": 117, "userID": 1, "destinationID": 28, "travelers": 3, "date": "2021/01/09", "duration": 15, "status": "approved", "suggestedActivities": []},
      {"id": 236, "userID": 1, "destinationID": 33, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 246, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 247, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2023/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 248, "userID": 2, "destinationID": 30, "travelers": 1, "date": "2025/11/12", "duration": 7, "status": "pending", "suggestedActivities": []},
      {"id": 263, "userID": 3, "destinationID": 30, "travelers": 1, "date": "2025/11/13", "duration": 6, "status": "pending", "suggestedActivities": []},
      {"id": 264, "userID": 3, "destinationID": 45, "travelers": 1, "date": "2024/01/01", "duration": 4, "status": "pending", "suggestedActivities": []},
      {"id": 265, "userID": 3, "destinationID": 16, "travelers": 1, "date": "2023/11/12", "duration": 14, "status": "pending", "suggestedActivities": []},
      {"id": 187, "userID": 43, "destinationID": 14, "travelers": 3, "date": "2020/11/12", "duration": 18, "status": "approved", "suggestedActivities": []},
      {"id": 196, "userID": 5, "destinationID": 16, "travelers": 1, "date": "2025/09/25", "duration": 8, "status": "pending", "suggestedActivities": []},
      {"id": 91, "userID": 5, "destinationID": 5, "travelers": 1, "date": "2020/04/29", "duration": 16, "status": "approved", "suggestedActivities": []},
      {"id": 163, "userID": 5, "destinationID": 48, "travelers": 1, "date": "2020/04/28", "duration": 10, "status": "approved", "suggestedActivities": []},
      {"id": 191, "userID": 6, "destinationID": 47, "travelers": 5, "date": "2019/08/17", "duration": 19, "status": "approved", "suggestedActivities": []},
      {"id": 76, "userID": 7, "destinationID": 17, "travelers": 5, "date": "2019/10/22", "duration": 20, "status": "approved", "suggestedActivities": []},
      {"id": 77, "userID": 7, "destinationID": 46, "travelers": 5, "date": "2020/05/28", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 97, "userID": 7, "destinationID": 3, "travelers": 3, "date": "2020/08/20", "duration": 4, "status": "approved", "suggestedActivities": []},
      {"id": 98, "userID": 7, "destinationID": 12, "travelers": 6, "date": "2020/10/6", "duration": 16, "status": "pending", "suggestedActivities": []},
      {"id": 106, "userID": 9, "destinationID": 34, "travelers": 5, "date": "2020/06/08", "duration": 17, "status": "approved", "suggestedActivities": []},
      {"id": 107, "userID": 8, "destinationID": 19, "travelers": 3, "date": "2020/06/02", "duration": 6, "status": "approved", "suggestedActivities": []}
    ];
  });
  
  it('should create a function that filters trips by the year for that logged in user', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const filterTripsByChosenYear = filterTripByYear(filteredTrips,year);
    expect(filterTripsByChosenYear).to.deep.equal([
      { id: 91, userID: 5, destinationID: 5, travelers: 1, date: '2020/04/29', duration: 16, status: 'approved', suggestedActivities: [] },
      { id: 163, userID: 5, destinationID: 48, travelers: 1, date: '2020/04/28', duration: 10, status: 'approved', suggestedActivities: [] }
    ])
  })

  it('this function should return a message if no year is present in logged in user trip data', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const invalidYear = 2026
    const filterTripsByChosenYear = filterTripByYear(filteredTrips,invalidYear);
    expect(filterTripsByChosenYear).to.deep.equal('This user has no trips in 2026')
  })

  it('should create a function that calculates cost per year', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id)
    const filterTripsByChosenYear = filterTripByYear(filteredTrips,year)
    const totalCostWithoutFee = getTotalCostPerYear(filterTripsByChosenYear,destinationData)
    expect(totalCostWithoutFee).to.equal(3050)
  })

  it('this same function should let user know that they did not book any trips through Venture Travel in the year they select, if total cost is 0 ', () => {
    const filteredTrips = getSpecificTravelerTrips(trips, id);
    const differentYear = 2024;
    const filterTripsByChosenYear = filterTripByYear(filteredTrips,differentYear);
    console.log("filterTripsByChosenYear",filterTripsByChosenYear)
    const totalCostWithoutFee = getTotalCostPerYear(filterTripsByChosenYear,destinationData);
    console.log("totalCostWithoutFee,",totalCostWithoutFee)
    expect(totalCostWithoutFee).to.equal('You did not book any trips in this year through Venture Travel');
  })

  
});


