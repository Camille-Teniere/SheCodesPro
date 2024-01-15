document.addEventListener("DOMContentLoaded", function () {
  //
  // Search function
  //

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let celciusUnit = "metric";
  let fahrenheitUnit = "imperial";
  let unit = celciusUnit;
  let rawTemperature;

  function changeToCelcius(event) {
    event.preventDefault();
    console.log("clicked on C");
    if (unit == fahrenheitUnit) {
      unit = celciusUnit;
      temperature.innerHTML = `${Math.round(rawTemperature)}°`;
      console.log(`Updated temperature: ${temperature.innerHTML}`);
    }
  }

  function changeToFahrenheit(event) {
    event.preventDefault();
    console.log("clicked on F");
    if (unit == celciusUnit) {
      unit = fahrenheitUnit;
      temperature.innerHTML = `${Math.round(rawTemperature * 1.8 + 32)}°`;
      console.log(`Updated temperature: ${temperature.innerHTML}`);
    }
  }

  function formatDate(dateNow) {
    let minutes = dateNow.getMinutes();
    let hours = dateNow.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[dateNow.getDay()];
    let date = dateNow.getDate();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${date} ${day}, ${hours}:${minutes}`;
  }

  function fetchWeather(response) {
    console.log(response.data);

    let placeElement = document.querySelector("#weather-infos #place p");
    let temperatureElement = document.querySelector("#temperature");
    let weatherElement = document.querySelector("#weather-infos #status p");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let localTimeElement = document.querySelector("#local-time");
    let iconElement = document.querySelector("#icon").querySelector("img");
    let celciusElement = document.querySelector("#celcius-link");
    let fahrenheitElement = document.querySelector("#fahrenheit-link");

    rawTemperature = response.data.main.temp;

    let place = response.data.name;
    let temperature = Math.round(rawTemperature);
    let temperatureWithSymbol = `${temperature}°`;
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed);
    let weather = capFirstLetter(response.data.weather[0].description);
    let localTime = new Date(response.data.dt * 1000);
    let icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    placeElement.innerHTML = place;
    temperatureElement.innerHTML = temperatureWithSymbol;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    windElement.innerHTML = `Wind: ${wind} km/h`;
    weatherElement.innerHTML = weather;
    localTimeElement.innerHTML = formatDate(localTime);
    iconElement.src = icon;
    celciusElement.addEventListener("click", changeToCelcius);
    fahrenheitElement.addEventListener("click", changeToFahrenheit);

    console.log(
      `${place} | ${rawTemperature}° | ${temperature}° | ${humidity}% | ${wind} km / h | ${weather}`
    );
    // console.log(`${localTime}`);
    console.log(`${icon}`);

    getForecast(place);
  }

  function searchPlace(place) {
    unit = celciusUnit;

    let apiKey = `ff8d31e224cad313b599807573231eca`;
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&APPID=${apiKey}`;
    console.log(`${apiLink}`);

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

  function getForecast(place) {
    unit = celciusUnit;

    let apiKey = `ff8d31e224cad313b599807573231eca`;
    let apiLink = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=${unit}&APPID=${apiKey}`;
    console.log(`${apiLink}`);

    axios.get(apiLink).then(displayForecast);
  }

  function displayForecast(response) {
    console.log(response.data);

    let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let forecastHTML = "";

    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
      <div class="forecast-card">
          <div class="forecast-date">${day}</div>
          <div class="forecast-icon">
            <img src="https://openweathermap.org/img/wn/04n@2x.png" />
          </div>
          <span class="forecast-min">3°</span>
          <span class="forecast-max">23°</span>
        </div>`;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }

  // //
  // // Date & Time
  // //

  // let now = new Date();
  // let date = now.getDate();
  // let day = days[now.getDay()];
  // let months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // let month = months[now.getMonth()];
  // let year = now.getFullYear();
  // let hours = now.getHours();
  // let minutes = now.getMinutes();
  // let fullDate = `${day} ${date} ${month} ${year}`;
  // let time = `${hours}h${minutes}`;
  // let dateAndTime = `${fullDate}, ${time}`;
  // console.log(dateAndTime);
  // let yourTimeElement = document.querySelector("#your-time");
  // yourTimeElement.innerHTML = `Your location time is: ${dateAndTime}`;
});
