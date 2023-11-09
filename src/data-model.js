
// let usernameInput = document.getElementById(username);
// const passwordInput = document.getElementById(password);
// let usernameInput = document.getElementById('username');
// const passwordInput = document.getElementById('password');

//querySelectors;
const loginPage = document.querySelector('.login');
const dashboardPage = document.querySelector('.dashboard');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

usernameInput.addEventListener("input", function() {
    const userID = getUserID(usernameInput);
   //  console.log("undefined input",usernameInput)
    console.log("User ID:", userID);
 });

// usernameInput = "traveler50"
export function getUserID(username) {
   const pattern = /^traveler([1-9]|[1-4][0-9]|50)$/;
   // console.log("usernameInput.value",username.value)
   //if pattern mataches the username input string
   if (pattern.test(username.value)) {
      let usernameParts = username.value.split(/(\d+)/).filter(Boolean)
      if (usernameParts.length === 2) {
         const userID = usernameParts[1]
         handleLogin(username, password, userID)
         return userID
      } 
   } else {
      console.log("Please enter a valid username");
   }
}
//handleLogin 
export function handleLogin(username, password, id) {
   if (username.value === "" || password.value === "") {
      return "Invalid input. Please provide both username and password."
   } else if (username.value !== `traveler${id}` || password.value !== 'travel') {
      return "Invalid  username and/or password. Please enter correct username and password"
   } else if (username.value === `traveler${id}` && password.value === 'travel') {
      loginPage.classList.add('hidden')
      dashboardPage.classList.remove('hidden')
   }
}

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

