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
date.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18</span>
                  <span class="weather-forecast-temperature-min">12</span>
                </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

///
function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = `${cityInput.value}`;
  let cityInputValue = cityInput.value;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showAll);
}

function showAll(response) {
  showTemperature(response);
  showHumidity(response);
  showWeatherDescription(response);
  showWind(response);
  showIcon(response);
  getForecast(response);
}

let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", search);

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  fahrenheitTemperature = toFahrenheit(celciusTemperature);
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
  windElement.innerHTML = `Wind: ${currentWind} m/s`;
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
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
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
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  preferencesTemperature = "celcius";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  updateTemperature();
}

function updateTemperature() {
  let currentTemperature = celciusTemperature;
  if (preferencesTemperature === "fahrenheit") {
    currentTemperature = fahrenheitTemperature;
  }
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

function toFahrenheit(celciusT) {
  return (celciusT * 9) / 5 + 32;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

// state of the application
let celciusTemperature = 0;
let fahrenheitTemperature = toFahrenheit(celciusTemperature);
let preferencesTemperature = "celcius";
let city = "Odense";
