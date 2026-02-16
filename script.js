const apiKey = "bd6dc6fb2b3e789d59695842731c47fc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// All Element Selection
const cityName = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind_speed");
const weatherIcon = document.querySelector(".weather_icon");
const inputFild = document.getElementsByTagName("input")[0];
const imgIcon = document.querySelector(".weather_icon");
const searchBtn = document.querySelector(".search_box").lastElementChild;
const err = document.querySelector(".error");
const weather = document.querySelector(".weather");

async function checkApiKey(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    err.style.display = "block";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    imgIconChange(data);
    reChangeContent(data);

    err.style.display = "none";
    weather.style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  let inputValue = inputFild.value;
  if (inputValue === "") {
    err.style.display = "none";
    window.alert("Please enter your city or country Name! ");
  } else {
    checkApiKey(inputValue);
  }
});

function imgIconChange(weatherObj) {
  let weaTemp = weatherObj.weather[0].main;
  if (weaTemp === "Clouds") {
    imgIcon.src = "./img/cloud.png";
  } else if (weaTemp === "Clear") {
    imgIcon.src = "./img/clear.png";
  } else if (weaTemp === "Rain") {
    imgIcon.src = "./img/rain-icon.png";
  } else if (weaTemp === "Snow") {
    imgIcon.src = "./img/snow-icon.png";
  } else if (weaTemp === "Drizzle") {
    imgIcon.src = "./img/dizzer.png";
  }
}

function reChangeContent(weatherObj) {
  cityName.innerHTML = weatherObj.name;
  temp.innerHTML = Math.round(weatherObj.main.temp) + "°C";
  humidity.innerHTML = weatherObj.main.humidity + "%";
  windSpeed.innerHTML = weatherObj.wind.speed + " km/h";
}
