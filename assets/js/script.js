var searchTerm;
var weatherToken = `dada7bf4d9f14d708e8eabdc7768b323`;



function getWeatherData() {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${weatherToken}&units=imperial`

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      searchLocation = data.name
      getSongRecommendation(data.weather[0].main)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};

function getSongRecommendation(currentWeather) {
  console.log(currentWeather)
}

getWeatherData()