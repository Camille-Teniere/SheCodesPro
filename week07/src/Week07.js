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

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //
  // Search function
  //

  let currentPlace = document.querySelector("#weather-infos #place p");
  currentPlace.innerHTML = "Singapore";
  placeValue = currentPlace.innerHTML;
  console.log(`The current place is: ${currentPlace.innerHTML}`);

  let weatherElement = document.querySelector("#weather-infos #status p");

  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let celciusUnit = "metric";
  let fahrenheitUnit = "imperial";
  let unit = celciusUnit;

  let apiKey = `ff8d31e224cad313b599807573231eca`;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${placeValue}&units=${unit}&APPID=${apiKey}`;

  axios.get(apiLink).then((response) => {
    console.log(response.data);

    let rawTemperature = response.data.main.temp;
    console.log(`Raw temp is ${rawTemperature}`);
    let temperature = Math.round(rawTemperature);
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let weather = capFirstLetter(response.data.weather[0].description);
    console.log(`${temperature} | ${humidity} | ${wind} | ${weather}`);
    console.log(`The current temperature is: ${temperature}`);

    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    weatherElement.innerHTML = weather;
  });

  function searchPlace(event) {
    event.preventDefault();

    let searchPlace = document.querySelector("#search-bar-input");

    let newPlace = document.querySelector("#weather-infos #place p");
    newPlace.innerHTML = searchPlace.value;
    let placeInput = newPlace.innerHTML;

    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${placeInput}&units=metric&APPID=${apiKey}`;

    axios.get(apiLink).then((response) => {
      console.log(response.data);

      let rawTemperature = response.data.main.temp;
      console.log(`Raw temp is ${rawTemperature}`);
      let temperature = Math.round(rawTemperature);
      let humidity = response.data.main.humidity;
      let wind = Math.round(response.data.wind.speed);
      let weather = capFirstLetter(response.data.weather[0].description);
      console.log(`${temperature} | ${humidity} | ${wind} | ${weather}`);
      console.log(`The new temperature is: ${temperature}`);

      temperatureElement.innerHTML = temperature;
      humidityElement.innerHTML = `Humidity: ${humidity}%`;
      windElement.innerHTML = `Wind: ${wind} km/h`;
      weatherElement.innerHTML = weather;
    });
  }

  let searchBar = document.querySelector("#search-form");
  searchBar.addEventListener("submit", searchPlace);

  // function searchPlace(event) {
  //   event.preventDefault();

  //   let searchPlace = document.querySelector("#search-bar-input");
  //   let newPlace = document.querySelector("#weather-infos #place p");
  //   newPlace.innerHTML = searchPlace.value;
  // }

  //
  // Temperature Switch
  //

  let celciusElement = document.querySelector("#celcius-link");
  let fahrenheitElement = document.querySelector("#fahrenheit-link");
  celciusElement.addEventListener("click", changeToCelcius);
  fahrenheitElement.addEventListener("click", changeToFahrenheit);

  function changeToCelcius(event) {
    event.preventDefault();
    console.log("clicked on C");
  }

  function changeToFahrenheit(event) {
    event.preventDefault();
    console.log("clicked on F");
    if (unit == celciusUnit) {
      temperatureElement.innerHTML = temperature.innerHTML * 1.8 + 32;
      console.log(`Updated temperature: ${temperature}`);
    }
  }
});
