let now = new Date();
let h2 = document.querySelector("h2");
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

h2.innerHTML = `${day} ${hours}:${minutes}`;

//function searchCity1(event) {
//  event.preventDefault();
//let cityInput = document.querySelector("#city-input");

//let h1 = document.querySelector("h1");
//if (cityInput.value) {
//  h1.innerHTML = `${cityInput.value}`;
// } else {
// h1.innerHTML = null;
//  alert("please enter a city");
//}
//}

//let search = document.querySelector("#city-form");
//search.addEventListener("submit", searchCity1);

/////

//let apiKey = "bbf5aa093fafae6856eb12399cd15947";

//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = `${cityInput.value}`;
  let cityInputValue = cityInput.value;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let submitForm = document.querySelector("form");
submitForm.addEventListener("submit", search);

function showTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = `${currentTemperature}˚C`;
  let cityInput = document.querySelector("#city-input");
  let cityInputValue = cityInput.value;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}`;
  axios.get(apiUrl).then(showHumidity);
}

///
function showHumidity(response) {
  let currentHumidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${currentHumidity}%`;
  let cityInput = document.querySelector("#city-input");
  let cityInputValue = cityInput.value;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWind);
}

///
function showWind(response) {
  let currentWind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${currentWind} m/s`;
  let cityInput = document.querySelector("#city-input");
  let cityInputValue = cityInput.value;
  let apiKey = "bbf5aa093fafae6856eb12399cd15947";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherDescription);
}

///
function showWeatherDescription(response) {
  let currentWeather = response.data.weather.id;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${currentWeather} `;
}
