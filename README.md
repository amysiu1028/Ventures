<div align="center">
  
# 🗺️ Venture Travel 
![Tests](https://badgen.net/badge/tests/passing/green?icon=github)

## 💾 Technologies Used
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![js-datepicker](https://img.shields.io/badge/Datepicker.js-red?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## 👩‍💻 Collaborator
[Amy Siu](https://github.com/amysiu1028) 

</div>

## 💭 Abstract
This project develops a user-friendly dashboard for travelers to log in and view their trip history. Travelers can use a dropdown bar to view their expenses on trips within a selected year, factoring in a 10% travel agent's fee. 

Additionally, they have the option to add new trips by providing details such as start date, end date, number of travelers, and destination. Clicking the 'Add Trip' button reveals the estimated cost for the new trip, including the 10% travel agent fee. Furthermore, clicking that button updates the upcoming and pending trips for the traveler. Travelers can add more trips to view the estimated cost for each.

This platform ensures accessibility for travelers, allowing them to navigate through the application using tabs. Additionally, the platform is screen reader-friendly, ensuring that users with visual impairments can effectively engage with the content and functionality of the application.

## 💻 Installation & Backend Server Setup Instructions:
1. Clone [this repository](https://github.com/amysiu1028/Ventures) to your local machine.
2. You will also need to clone down this [local server](https://github.com/turingschool-examples/travel-tracker-api) run it in a separate tab in your terminal each time you run your client.
2. In your terminal navigate to and open the project directory Ventures.
3. Then in your terminal navigate to travel-tracker-api, install and then start your local server with. Run `npm install` and` npm start`
4. Go back into the Ventures project directory file run `npm install` and` npm start`.
5. Click into `http://localhost:8080/`to view your to view the application on your local computer.

## 📝  Context
This is a six-day solo project focused on developing an accessible travel agency application. During this time, I collaborated with software developers by managing pull requests and editing applications to enhance both readability and accessibility.

## 🎥 Preview 
https://user-images.githubusercontent.com/140124108/282933916-7fefcced-050b-48eb-8c7a-fd81572d8178.mov 

## 🧠 Learning Goals:
- Use object and array prototype methods to perform data manipulation.
- Create a clear and accessible user interface.
- Make network requests to retrieve data and add data.
- Implement a robust testing suite using TDD.
- Write DRY, reusable code that follows SRP (Single Responsibility Principle).

## 🎆 Wins && 🔥 Challenges: 
**Wins:**
⭐ Using datepicker library to calculate the duration by the start date and end date inputs from the dates the datepicker library when user selects dates, and if the user decides to type in the dates.
⭐ Calculating total cost for the selected year for user for all past, upcoming, pending trips. 
⭐ Updating added trips to upcoming and pending trips. 

**Challenges:**
❗ Choosing to use datepicker library to calculate dates versus html type="date".
❗ Calculating total cost for new trip user wants to add.

## 📝 Observations && ❓ Questions:
**Observations:**
- I took it upon myself to figure out a lot of new methods on my own and apply them in this project. One thing I would like to learn more is how my approach is for other software developers. Is it easy to read? What areas should I improve on?
**Questions:**
- One thing I noticed was I wasn't able to add images to my images folder within my src directory because the image didn't display with the path I provided in my html unless I added the images to a new images folder in the same directory as the html file. I'm wondering why is that? And how would I be able to add future images with just adding it into the images folder in the src directory?
