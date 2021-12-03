var searchTerm = "Charlotte";
var weatherToken = `dada7bf4d9f14d708e8eabdc7768b323`;

var userAccessToken = 'BQD6HLZ4IhxmHIAMv73GzZud3RGOjbT459jhSv65-gjt5IDyTf5rgXzWLMIly3HOeIpTfQ-uEv3y-7BddrFXEfPdfNuVhygTspvgEbnZiqSTnocXf4bzx0CCYGGJ8z1HiQ43MeuV';


function getWeatherData() {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${weatherToken}&units=imperial`

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      searchLocation = data.name
      console.log(data.weather[0].main);
      getSongRecommendation(data.weather[0].main)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};
// theaudiodb.com/api/v1/json/2/search.php?s=coldplay
function getSongRecommendation(weather) {
  console.log(weather)
  var artist;
  switch (weather) {
    case "Clouds": artist = "Rick+Astley";
      break;
    case "Thunderstorm": artist;
      break;
    case "Drizzle": artist;
      break;
    case "Rain": artist;
      break;
    case "Snow": artist;
      break;
    case "Mist": artist;
      break;
    case "Ash": artist;
      break;
    case "Tornado": artist;
      break;
    case "Fog": artist;
      break;
    case "Clear": artist;

      break;

    default: 'Rick+Astley'
      break;
  }
  var apiUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
  console.log(apiUrl)

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      console.log(data)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};

getWeatherData()