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