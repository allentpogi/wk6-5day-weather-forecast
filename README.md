# wk6-5day-weather-forecast

## Description

This is my submission for the Week 6 challenge.

## Table of Contents (Optional)

- [Installation](#installation)
- [Features](#features)
- [Future development](#future-development)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This project is using my own API key so that I can use the OpenWeather API to fetch the weather.

When deploying, ensure that the API key is a valid API key for OpenWeather API

## Features

1. On load of the page, the city is defaulted to Melbourne and the page will load the weather date for Melbourne.
2. When searching for a City and the Search button is clicked, the following will happen:
    - If the text box is empty and Search is clicked, an alert will be presented to the user
    - If the city being searched exists in the search history, the city will not be saved again to avoid duplicate entries in search history
    - The city entered in the text box will be trimmed of leading and trailing spaces
    - The city entered in the text box will be converted to title case 
    - If all goes well, the City will be saved in local storage
    - The weather data will be refreshed to dispaly weather information for that city
3. When clicking on a City in the search history, the weather data will be refreshed with the weather information for that city.

## Future development

1. Include auto-complete in the text box
2. Include a remove function to remove City from search history.


## Usage

Navigate to https://allentpogi.github.io/wk6-5day-weather-forecast/ to visit the end result.

The website looks like this:

![weather forecast image](./assets/img/Project6.jpg)

## Credits

Thanks for Jack and Sid for being awesome on week 2 as always!

## License

n/a