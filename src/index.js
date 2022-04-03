let now = new Date();
let date = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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
date.innerHTML = `Last updated: ${day} ${hours}:${minutes}`;
///

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiAddress = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiAddress}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showAll);
}

navigator.geolocation.getCurrentPosition(showPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  forecast = response.data.daily;
  updateForecast();
}

function updateForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    tempCorF(forecastDay.temp.max)
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    tempCorF(forecastDay.temp.min)
                  )}°</span>
                </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

///
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityName = cityInput.value;
  doSearch();
}

function doSearch() {
  let cityTitle = document.querySelector("h1");
  cityTitle.innerHTML = `${cityName}`;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showAll);
}

function showAll(response) {
  showTemperature(response);
  showHumidity(response);
  showWeatherDescription(response);
  showWind(response);
  showRealFeel(response);
  showIcon(response);
  getForecast(response);
}

let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", search);

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  updateTemperature();
}

///
function showHumidity(response) {
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${currentHumidity}%`;
}

///
function showWind(response) {
  let currentWind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: <br /> ${currentWind} m/s`;
}

///
function showRealFeel(response) {
  let currentRealFeel = Math.round(response.data.main.feels_like);
  let realFeelElement = document.querySelector("#real-feel");
  realFeelElement.innerHTML = `Real feel: ${currentRealFeel}°C`;
}

///
function showWeatherDescription(response) {
  let currentWeather = response.data.weather[0].description;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${currentWeather} `;
}

///
function showIcon(response) {
  let icon = response.data.weather[0].icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
}

function getForecast(response) {
  let coordinates = response.data.coord;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(displayForecast);
}

///
function displayFahrenheitTemp(event) {
  event.preventDefault();
  preferencesTemperature = "fahrenheit";
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  updateTemperature();
  updateForecast();
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  preferencesTemperature = "celcius";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  updateTemperature();
  updateForecast();
}

function updateTemperature() {
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(tempCorF(celciusTemperature));
}

function tempCorF(temp) {
  let currentTemperature = temp;
  if (preferencesTemperature === "fahrenheit") {
    currentTemperature = toFahrenheit(temp);
  }
  return currentTemperature;
}

function toFahrenheit(celciusT) {
  return (celciusT * 9) / 5 + 32;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

window.onload = function () {
  doSearch();
};

// state of the application
let celciusTemperature = 0;
let forecast = null;
let preferencesTemperature = "celcius";
let cityName = "Odense";
