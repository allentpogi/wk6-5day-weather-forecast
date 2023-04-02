var btn = document.querySelector("#search-btn");
var searchHistory = document.querySelector(".search-history")


btn.addEventListener("click", function(event) {
    var cityInput = document.querySelector("#city")
    if (cityInput.value != "") {
        var city = cityInput.value
        console.log(city)
        cityInput.value = ""

        // create the buttons

        var cityBtn = document.createElement("button")
        console.log(searchHistory)
        console.log(cityBtn)
        cityBtn.textContent = city
        searchHistory.appendChild(cityBtn)

    }
});