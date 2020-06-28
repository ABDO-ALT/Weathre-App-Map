const apiKey = "94732983488740c7ac18361880e08e1d";
let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];
let weather;
let getIcon;
let temperature;
let temperatureDescription;
let locationCountry;
const cities = [];
cities.push({
  name: "Barcelona",
  latitude: 41.41,
  longitude: 2.19,
});
cities.push({
  name: "Madrid",
  latitude: 40.41,
  longitude: -3.7,
});
cities.push({
  name: "Sevilla",
  latitude: 37.38,
  longitude: -5.98,
});
cities.push({
  name: "Valencia",
  latitude: 39.47,
  longitude: -0.38,
});
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

function onSuccess(position) {
  console.log("pp", position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const weatherCall = fetch(
    "https://api.weatherbit.io/v2.0/current?" +
      "lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      apiKey
  );

  weatherCall
    .then((response) => response.json())
    .then((weatherInfo) => {
      render(weatherInfo);
    })
    .catch((error) => console.log(error));

  const arrayOfCities = (latitude, longitude) => {
    fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((weather) => responseOfArray(weather));
  };

  for (let i = 0; i < cities.length; i++) {
    arrayOfCities(cities[i].latitude, cities[i].longitude);
  }
}

function responseOfArray(get) {
  console.log(get);

  let container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  let appTitle = document.createElement("div");
  appTitle.className = "app-title";
  let p = document.createElement("p");
  p.innerHTML = "Weather";
  appTitle.appendChild(p);
  container.appendChild(appTitle);

  let weatherContainer = document.createElement("div");
  weatherContainer.className = "weather-container";
  container.appendChild(weatherContainer);

  let weatherIcon = document.createElement("div");
  weatherIcon.className = "weather-icon";
  let icon = document.createElement("img");
  icon.src = "icons/" + get.data[0].weather.icon + ".png";
  weatherIcon.appendChild(icon);
  weatherContainer.appendChild(weatherIcon);

  let temp = document.createElement("div");
  temp.className = "temperature-value";
  let tempParagraph = document.createElement("p");
  tempParagraph.innerHTML = get.data[0].temp.toFixed(1);
  temp.appendChild(tempParagraph);
  weatherContainer.appendChild(temp);

  let temperatureDescriptionOfArray = document.createElement("div");
  temperatureDescriptionOfArray.className = "temperature-description";

  let temperatureDescriptionOfArrayParagraph = document.createElement("p");
  temperatureDescriptionOfArrayParagraph.innerHTML =
    get.data[0].weather.description;
  temperatureDescriptionOfArray.appendChild(
    temperatureDescriptionOfArrayParagraph
  );
  weatherContainer.appendChild(temperatureDescriptionOfArray);

  let locationOfArray = document.createElement("div");
  locationOfArray.className = "location";
  let locationParagraph = document.createElement("p");
  locationParagraph.innerHTML = get.data[0].city_name;
  locationOfArray.appendChild(locationParagraph);
  weatherContainer.appendChild(locationOfArray);
}

function render(weatherInfo) {
  console.log("weatherInfo", weatherInfo);
  //console.log(weatherInfo.data[0].weather.icon);
  getIcon = document.getElementsByClassName("weather-icon")[0];
  getIcon.innerHTML =
    "<img src='icons/" + weatherInfo.data[0].weather.icon + ".png'></img>";
  //console.log(weatherInfo.data[0].temp);
  temperature = document.getElementsByClassName("temperature-value")[0];
  temperature.innerHTML =
    "<p>" + weatherInfo.data[0].temp + "°<span>C</span></p>";
  // console.log(weatherInfo.data[0].weather.description);
  temperatureDescription = document.getElementsByClassName(
    "temperature-description"
  )[0];
  temperatureDescription.innerHTML =
    "<p>" + weatherInfo.data[0].weather.description + "</p>";
  console.log(weatherInfo.data[0].city_name);
  locationCountry = document.getElementsByClassName("location")[0];
  locationCountry.innerHTML = "<p>" + weatherInfo.data[0].city_name + "</p>";
  //+
  // "<br>" +
  // "<p>" +
  // weatherInfo.data[0].country_code +
  // "</p>";
}

function onError(error) {
  console.error("No no no ", error);
  // 1. take message and put it in a p
  const p = document.createElement("p");
  p.innerHTML = error.message;
  // 2. display: block (notification div)
  notification.style.display = "block";
  // 3. append p inside notification
  notification.appendChild(p);
}

function serchInpute() {
  console.log("hi");

  let cityName = document.getElementById("cityName").value.toUpperCase();

  if (cityName == "") {
    alert("The input should not be empty");
  } else {
    const citiesFetch = fetch(
      `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${apiKey}`,
      console.log(cityName)
    );
    citiesFetch.then((responses) => {
      if (responses.status == 204) {
        alert("The name of the city you write doeesn't exist");
      } else {
        responses.json().then((get) => {
          console.log(get);

          responseOfArray(get);
        });
      }
    });
  }
}
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3Jpc3RpaW5hcCIsImEiOiJja2IwanFpeXcwOG81MnlxajZ1anNuNWF2In0.9ezdeBkpia-BiiZHrALb5A";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [2.1734, 41.3851],
  zoom: 5,
});

let marker = new mapboxgl.Marker()
  .setLngLat([0.1278, 51.5074])

  .addTo(map);
let marker1 = new mapboxgl.Marker()
  .setLngLat([2.1734, 41.3851])

  .addTo(map);

let marker2 = new mapboxgl.Marker()
  .setLngLat([24.7536, 59.437])

  .addTo(map);

let marker3 = new mapboxgl.Marker()
  .setLngLat([139.6503, 35.6762])

  .addTo(map);
