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

  // function changeToCelcius(event) {
  //   event.preventDefault();
  //   console.log("clicked on C");
  //   if (unit == fahrenheitUnit) {
  //     unit = celciusUnit;
  //     temperature.innerHTML = Math.round((temperature.innerHTML - 32) / 1.8);
  //     console.log(`Updated temperature: ${temperature.innerHTML}`);
  //   }
  // }

  // function changeToFahrenheit(event) {
  //   event.preventDefault();
  //   console.log("clicked on F");
  //   if (unit == celciusUnit) {
  //     unit = fahrenheitUnit;
  //     temperature.innerHTML = Math.round(temperature.innerHTML * 1.8 + 32);
  //     console.log(`Updated temperature: ${temperature.innerHTML}`);
  //   }
  // }

  function fetchWeather(response) {
    console.log(response.data);

    let placeElement = document.querySelector("#weather-infos #place p");
    let temperatureElement = document.querySelector("#temperature");
    let weatherElement = document.querySelector("#weather-infos #status p");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let celciusElement = document.querySelector("#celcius-link");
    let fahrenheitElement = document.querySelector("#fahrenheit-link");

    let place = response.data.name;
    let rawTemperature = response.data.main.temp;
    let temperature = Math.round(rawTemperature);
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let weather = capFirstLetter(response.data.weather[0].description);
    console.log(
      `${place} | ${rawTemperature}° | ${temperature}° | ${humidity}% | ${wind} km / h | ${weather}`
    );

    placeElement.innerHTML = place;
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    weatherElement.innerHTML = weather;

    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    weatherElement.innerHTML = weather;
    // celciusElement.addEventListener("click", changeToCelcius);
    // fahrenheitElement.addEventListener("click", changeToFahrenheit);
  }

  function searchPlace(place) {
    let celciusUnit = "metric";
    let fahrenheitUnit = "imperial";
    let unit = celciusUnit;

    let apiKey = `ff8d31e224cad313b599807573231eca`;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&APPID=${apiKey}`;
    //   console.log(`${apiLink}`);

    axios.get(apiLink).then(fetchWeather);
  }

  function submitInfo(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar-input");

    searchPlace(searchInput.value);
  }

  let searchBar = document.querySelector("#search-form");
  searchBar.addEventListener("submit", submitInfo);

  searchPlace("Singapore");
});
