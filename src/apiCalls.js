
//querySelectors:
const errorMessage = document.querySelector('.errorMessage');

export function fetchTravelers() {
    fetch("http://localhost:3001/api/v1/travelers")
        .then((response) => {
            if (!response.ok) {
                throw new Error (`${response.status}: Failed to fetch data`)
            }
            return response.json()
        })
        .then((data) => {
            console.log("travelerData:",data)
            return data;
        })
        .catch((error) => {
            if (error instanceof TypeError) {
                //this may need to change, where other things may need to be hidden.
                errorMessage.innerText = "‼️ Unable to connect to the server.    Please try again later. "
            } else {
                alert(error.message)
            }
        })
}