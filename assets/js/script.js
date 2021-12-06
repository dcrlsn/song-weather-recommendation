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
      getSongRecommendation(data)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};
// theaudiodb.com/api/v1/json/2/search.php?s=coldplay
function getSongRecommendation(data) {
  console.log(data)
  console.log(data.weather[0].main)
  var recommendation;
  if (Math.floor(data.main.temp === 69)) recommendation = [{
    artist: 'Rick+Astley',
    spotifyID: ''
  }];
  else {
    switch (data.weather[0].main) {
      case "Clouds": recommendation = [{
        artist: 'Rick+Astley',
        spotifyID: ''
      }];
        break;
      case "Thunderstorm": recommendation;
        break;
      case "Drizzle": recommendation;
        break;
      case "Rain": recommendation;
        break;
      case "Snow": recommendation;
        break;
      case "Mist": recommendation;
        break;
      case "Ash" || "Tornado": recommendation = [{
        artist: 'Imagine+Dragons',
        spotifyID: ''
      }, {
        artist: 'Nickelback',
        spotifyID: ''
      }];
        break;
      case "Clear": recommendation;
        break;
      case "Haze" || "Fog": recommendation = [{
        artist: 'Snoop+Dogg',
        spotifyID: '7hJcb9fa4alzcOq3EaNPoG'
      }, {
        artist: 'Willie+Nelson',
        spotifyID: ''
      }, {
        artist: 'Jimi Hendrix',
        spotifyID: ''
      }];
        break;
      default: recommendation = ['Rick+Astley']
        break;
    }
  }
  console.log(recommendation);
  var randArtist = recommendation[Math.floor(Math.random() * recommendation.length)].artist
  console.log(randArtist);
  var apiUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${randArtist}`
  console.log(apiUrl);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      displaySongRecommendation(data, randArtist.spotifyID)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};
//<iframe src="https://open.spotify.com/embed/artist/7hJcb9fa4alzcOq3EaNPoG?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
function displaySongRecommendation(data, spotifyID) {
  var spotifyDiv = document.createElement('div')
  var iframe = document.createElement('iframe')
  iframe.src = `https://open.spotify.com/embed/artist/${spotifyID}?utm_source=generator`
  iframe.width = `100%`
  iframe.height = `380`
  iframe.frameBorder = `0`
  iframe.allowFullscreen = ''
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'

}

getWeatherData()

