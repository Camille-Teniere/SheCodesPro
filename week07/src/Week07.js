//In your project, display the current date and time using JavaScript: Tuesday 16:00
//Add a search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

document.addEventListener("DOMContentLoaded", function () {
  //
  // Date & Time
  //

  let now = new Date();
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let fullDate = `${day} ${date} ${month} ${year}`;
  let time = `${hours}h${minutes}`;
  let dateAndTime = `${fullDate}, ${time}`;
  console.log(dateAndTime);

  let currentTimeP = document.getElementById("day-hour");
  currentTimeP.textContent = dateAndTime;

  //
  // Search function
  //

  function searchPlace(event) {
    event.preventDefault();

    let searchPlace = document.querySelector("#search-bar-input");
    let newPlace = document.querySelector("#weather-infos #place p");
    newPlace.innerHTML = searchPlace.value;
  }

  let currentPlace = document.querySelector("#weather-infos #place p");
  console.log(`The current place is: ${currentPlace.innerHTML}`);

  let searchBar = document.querySelector("#search-form");
  searchBar.addEventListener("submit", searchPlace);

  //
  // Temperature Switch
  //

  function changeToCelcius(event) {
    event.preventDefault();
    let tempTxt = document.querySelector("#temperature");

    tempTxt.innerHTML = "15";
  }

  function changeToFahrenheit(event) {
    event.preventDefault();
    let tempTxt = document.querySelector("#temperature");

    tempTxt.innerHTML = "59";
  }

  let currentTemp = document.querySelector("#temperature");
  console.log(`The current temperature is: ${currentTemp.innerHTML}°`);

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", changeToCelcius);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", changeToFahrenheit);
});
