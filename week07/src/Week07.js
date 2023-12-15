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

  function search(event) {
    console.log("plp2");
    event.preventDefault();

    let searchInputElement = document.querySelector("#search-bar-input");

    let cityElement = document.querySelector("#place");
    cityElement.innerHTML = searchInputElement.value;
    let cityInput = cityElement.innerHTML;

    let apiKey = `ff8d31e224cad313b599807573231eca`;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&APPID=${apiKey}`;

    axios.get(apiLink).then((response) => {
      console.log(response.data);

      let temp = Math.round(response.data.main.temp);
      console.log(`${temp}`);

      let temperatureElement = document.querySelector(
        "#temperaturecurrent-temperature-value"
      );
      let temperatureUnitElement = document.querySelector(
        ".current-temperature-unit"
      );

      temperatureElement.innerHTML = temp;
    });
  }

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
