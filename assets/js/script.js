//api key=919e05da493539fadb232642426ddb0a
let citySearched = "Melbourne";
console.log(citySearched)
let cities = [];
let weather5Daydiv = document.querySelector('.weather-5day');
let weatherTodaydiv = document.querySelector(".weather-today")
let fiveDayh5 = document.querySelector("h5")

/* to get the latitude and longtitude of the city  */
let getCoordinates = function (city) {
  let getCoordinatesurl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      citySearched +
      "&limit=7&appid=919e05da493539fadb232642426ddb0a";

  fetch(getCoordinatesurl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          let latitude = data[0].lat;
          let longitude = data[0].lon;
          getForecast(latitude, longitude);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Ooops! Something went wrong. Please try again.");
    });
};


/* getForecast will use the coordinates from the getCoordinates function */
let getForecast = function (latitude, longitude) {
  let weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?&lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=919e05da493539fadb232642426ddb0a";
  fetch(weatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            let forecastArray = []
        for (let i = 0; i < data.list.length; i++) {
            let forecastObject = data.list[i];

            let testTime = forecastObject.dt_txt.split(" ")[1]
            if(testTime==="12:00:00") {
                forecastArray.push(forecastObject)
            }
        }
        displayToday(forecastArray)
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

/* to render the weather forecast for today */
let displayToday = (array) => {
  /* create weather card element for today's forecast */
  let weatherTodaycard = document.createElement("div");
  weatherTodaycard.setAttribute("id", "weather-today-card");
  let weatherDivtop = document.createElement("div");
  weatherDivtop.setAttribute("id", "weather-div-top");
  let weatherDivimg = document.createElement("div");
  weatherDivimg.setAttribute("id", "weather-div-img");
  let weatherDivinfo = document.createElement("div");
  weatherDivinfo.setAttribute("id", "weather-div-info");



  let temperatureTodayEl = document.createElement("p");
  let humidityTodayEl = document.createElement("p");
  let windTodayEl = document.createElement("p");
  let imageTodayEl = document.createElement("img");

  let todayHeading = document.createElement("h4");
  todayHeading.textContent = "Today's forecast for " + citySearched +":"

  /* weather image */
  imageTodayEl.src = "https://openweathermap.org/img/wn/"+ array[0].weather[0].icon + "@2x.png"
    
  temperatureTodayEl.textContent = "Temperature: " + array[0].main.temp + "°C";
  humidityTodayEl.textContent = "Humidity: " + array[0].main.humidity + "%";
  windTodayEl.textContent = "Wind: " + array[0].wind.speed + "km/h";

  /* appending newly created element into weather container */
  weatherDivtop.append(weatherDivimg, weatherDivinfo)
  weatherDivimg.append(imageTodayEl)
  weatherDivinfo.append(temperatureTodayEl, humidityTodayEl, windTodayEl)

  weatherTodaycard.append(todayHeading, weatherDivtop);
  weatherTodaydiv.appendChild(weatherTodaycard);


}

/* to render the weather forecast for the next 5 days */
let displayForecast = function(array) {
  array.forEach(function(day){

    
    fiveDayh5.textContent = "Forecast for next 5 days:"

    /* create weather card element which will contain weather info for each day */
    weather5Daycard = document.createElement("div");
    weather5Daycard.setAttribute("id", "weather-card");

    /* date element */
    let dateEl = document.createElement("h6");
    dateEl.setAttribute("id", "date-header");
    /* weather data element */
    let temperatureEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let windEl = document.createElement("p");
    let imageEl = document.createElement("img");

    /* rendering the date on html */
    let dateArr = day.dt_txt.split(" ")[0].split("-");
    let date = dateArr[2] + "/" + dateArr[1];
    dateEl.textContent = date;

    /* weather image */
    imageEl.src = "https://openweathermap.org/img/wn/"+ day.weather[0].icon + "@2x.png"
      
    temperatureEl.textContent = "Temperature: " + day.main.temp + "°C";
    humidityEl.textContent = "Humidity: " + day.main.humidity + "%";
    windEl.textContent = "Wind: " + day.wind.speed + "km/h";

    /* appending newly created element into weather container */
    weather5Daycard.append(dateEl, imageEl, temperatureEl, humidityEl, windEl);
    weather5Daydiv.appendChild(weather5Daycard);
  })  
}


//making the search button work
let searchBtn = document.querySelector("#search-button")
let searchBox = document.querySelector("#search-box")

searchBtn.addEventListener("click", function(event) {
  if (searchBox.value === "") {
    alert("Please enter a city.")
  } else {
    citySearched = searchBox.value.trim()
    citySearched = toTitleCase(citySearched)
    searchBox.value = ""
    if (cities.includes(citySearched) == false) {
      cities.push(citySearched);
    }
    weatherTodaydiv.innerHTML = ""
    weather5Daydiv.innerHTML = ""
    fiveDayh5.textContent = ""
    getCoordinates(citySearched)
    storeCity(cities)
    displayCitysearchHistory()
  }
});

//convert the searched city to title case
function toTitleCase(citySearched) {
  return citySearched.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}



// This function is being called below and will run when the page loads. 
//This will get the city history from local storage.
let init = () => {
  getCoordinates(citySearched)
  let cityHistory = JSON.parse(localStorage.getItem("allenpogi-city-history"));
  console.log(cityHistory)

  // If cities are found in the history were retrieved from localStorage
  if (cityHistory !== null) {
    cities = cityHistory;
  }

  // Display city search history
  displayCitysearchHistory();
  
}



// Display the search history
// The following function displays items from local storage as buttons

let displayCitysearchHistory = () => {
    // Render buttons for each history
    let searchHistory = document.querySelector(".search-history")
    searchHistory.innerHTML = "";
    let searchH3 = document.createElement("h3")
    searchH3.textContent = "Search history:"
    if (cities.length != 0) {    
      searchHistory.append(searchH3)
    }
    for (let i = 0; i < cities.length; i++) {
      let city = cities[i];
  
      let button = document.createElement("button");
      button.classList.add("cityButton")
      button.textContent = city;

      searchHistory.appendChild(button);
    }

}

// Stringify and set key in localStorage
let storeCity = () => {
    localStorage.setItem("allenpogi-city-history", JSON.stringify(cities));
}

//event listener for the cities in the search history
//this will remove the city from local storage when the user clicks remove
let cityButton = document.querySelector(".search-history")
cityButton.addEventListener("click", function (event) {
  var element = event.target;

  if (element.matches("button") === true) {
    citySearched = element.textContent
    weatherTodaydiv.innerHTML = ""
    weather5Daydiv.innerHTML = ""
    fiveDayh5.textContent = ""
    getCoordinates(citySearched)
  }

});


//call the init function on load
init()

