//api key=919e05da493539fadb232642426ddb0a

var city = "New York"

/* to get the latitude and longtitude of the city  */
var getCoords = function (city) {
    var geoUrl =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&appid=919e05da493539fadb232642426ddb0a";
  
    // console.log("GeoURL: " + geoUrl); // TODO: delete this before submitting
      fetch(geoUrl)
        .then(function (response) {
          console.log(response); // TODO: delete this before submitting
          if (response.ok) {
            response.json().then(function (data) {
              var latitude = data[0].lat;
              var longitude = data[0].lon;
              getForecast(latitude, longitude);
            });
          } else {
            alert("Error: " + response.statusText);
          }
        })
        .catch(function (error) {
          alert("Unable to connect to Open Weather");
        });
    };

    getCoords(city)


  /* getForecast will use the coordinates from the getCoord function */
  var getForecast = function (latitude, longitude) {
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&units=metric&appid=998c310a82d62a4fbd406adc6cf4d96f";
    fetch(weatherUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              // console.log(data) // TODO: delete this before submitting
              let forecastArray = []
          for (let i = 0; i < data.list.length; i++) {
              var forecastObject = data.list[i];
  
              var testTime = forecastObject.dt_txt.split(" ")[1]
              if(testTime==="12:00:00") {
                  forecastArray.push(forecastObject)
              }
              
          }
          displayForecast(forecastArray)
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to Weatherorg");
      });
  };

  /* to render the weather forecast on the destinations.html page */
  var displayForecast = function(array) {
    var weatherContainerEl = document.getElementById('weather-container');
    array.forEach(function(day){

      /* create weather card element which will contain weather info for each day */
      weatherCardEl = document.createElement("div");
      weatherCardEl.setAttribute("id", "weather-card");

      /* date element */
      var dateEl = document.createElement("h3");
      dateEl.setAttribute("id", "date-header");
      /* weather data element */
      var temperatureEl = document.createElement("p");
      var humidityEl = document.createElement("p");
      var windEl = document.createElement("p");
      var imageEl = document.createElement("img");

      /* rendering the date on html */
      var dateArr = day.dt_txt.split(" ")[0].split("-");
      var date = dateArr[2] + "/" + dateArr[1];
      dateEl.textContent = date;

      /* weather image */
      imageEl.src = "https://openweathermap.org/img/wn/"+ day.weather[0].icon + "@2x.png"
        
      /* rendering weather data on html */
      // var tempTitle = document.createElement("p")
      // var temp = tempTitle.textContent = "Temperature: "
      temperatureEl.textContent = "Temperature: " + day.main.temp + "°C";
      humidityEl.textContent = "Humidity: " + day.main.humidity + "%";
      windEl.textContent = "Wind: " + day.wind.speed + "km/h";

      /* appending newly created element into weather container */
      weatherCardEl.append(dateEl, imageEl, temperatureEl, humidityEl, windEl);
      weatherContainerEl.appendChild(weatherCardEl);
    })  
  }



var cities = [];
var btn = document.querySelector("#search-btn");
var searchHistory = document.querySelector(".search-history")

// This function is being called below and will run when the page loads. This will get the city history from local storage
function init() {
    var cityHistory = JSON.parse(localStorage.getItem("allenpogi-city-history"));
    console.log(cityHistory)
    console.log("test")
  
    // If cities are found in the history were retrieved from localStorage
    if (cityHistory !== null) {
      cities = cityHistory;
    }
  
    // Display city search history
    displayCitysearchHistory();
}

// The following function displays items from local storage as buttons
function displayCitysearchHistory() {
    // Render buttons for each history
    searchHistory.innerHTML = "";
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
  
      var button = document.createElement("button");
      button.textContent = city;

      searchHistory.appendChild(button);
    }
}

function storeCity() {
    // Stringify and set key in localStorage
    localStorage.setItem("allenpogi-city-history", JSON.stringify(cities));
}


btn.addEventListener("click", function(event) {
    var cityInput = document.querySelector("#city")
    if (cityInput.value.trim != "") {
        var city = cityInput.value.trim()
        console.log(city)
        cityInput.value = ""

        cities.push(city);


        storeCity()
        displayCitysearchHistory()

    }
});


// function getCityhistory() {
//     var cities = localStorage.getItem("allenpogi-city-weather")
//     console.log(cities)
// }

// getCityhistory()
    
// var cityBtn = document.createElement("button")
// console.log(searchHistory)
// console.log(cityBtn)
// cityBtn.textContent = city
// searchHistory.appendChild(cityBtn)

init()