var params = new URLSearchParams(document.location.search);
var searchTerm = params.get('q');
var weatherToken = `dada7bf4d9f14d708e8eabdc7768b323`;
var searchFormElement = document.querySelector('form')
var searchInput = document.querySelector('#search-field')

var currentWeather = document.querySelector('#current-weather')
var currentWeatherLocation = document.querySelector('#current-weather h1')
var currentWeatherTemp = document.querySelector('#current-weather h2')

var songRecommendation = document.querySelector('#song-recommendation')
var songRecommendationName = document.querySelector('#song-recommendation h1')
var songRecommendationBio = document.querySelector('#song-recommendation h2')


function getWeatherData() {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${weatherToken}&units=imperial`

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      displayCurrentWeather(data);
      getSongRecommendation(data);
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
    });
  ;
};
// theaudiodb.com/api/v1/json/2/search.php?s=coldplay
function getSongRecommendation(data) {
  var recommendation;
  console.log(data.weather[0].main)
  if (Math.floor(data.main.temp === 69)) recommendation = [{
    artist: 'Rick+Astley',
    spotifyID: '0gxyHStUsqpMadRV0Di1Qt'
  }];
  else {
    switch (data.weather[0].main) {
      case "Clouds": recommendation = [{
        artist: 'Rick+Astley',
        spotifyID: '0gxyHStUsqpMadRV0Di1Qt'
      }];
        break;
      case "Thunderstorm": recommendation;
        break;
      case "Drizzle": recommendation;
        break;
      case "Rain": recommendation = [{
        artist: 'Rick+Astley',
        spotifyID: '0gxyHStUsqpMadRV0Di1Qt'
      }];
        break;
      case "Snow": recommendation;
        break;
      case "Ash" || "Tornado": recommendation = [{
        artist: 'Imagine+Dragons',
        spotifyID: '53XhwfbYqKCa1cC15pYq2q'
      }, {
        artist: 'Nickelback',
        spotifyID: '6deZN1bslXzeGvOLaLMOIF'
      }];
        break;
      case "Clear": recommendation;
        break;
      case "Mist" || "Haze" || "Fog": recommendation = [{
        artist: 'Snoop+Dogg',
        spotifyID: '7hJcb9fa4alzcOq3EaNPoG'
      }, {
        artist: 'Willie+Nelson',
        spotifyID: '5W5bDNCqJ1jbCgTxDD0Cb3'
      }, {
        artist: 'Jimi+Hendrix',
        spotifyID: '776Uo845nYHJpNaStv1Ds4'
      }];
        break;
      default: recommendation = [{
        artist: 'Rick+Astley',
        spotifyID: '0gxyHStUsqpMadRV0Di1Qt'
      }]
        break;
    }
  }
  var randArtist = recommendation[Math.floor(Math.random() * recommendation.length)]
  var apiUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${randArtist.artist}`

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) return response.json();
      else alert(`Error: ${response.statusText}`);
    })
    .then(function (data) {
      console.log(data)
      displaySongRecommendation(data, randArtist.spotifyID)
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeatherMap");
      console.log(error)
    });
  ;
};

//<iframe src="https://open.spotify.com/embed/artist/0gxyHStUsqpMadRV0Di1Qt?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>


//<iframe src="https://open.spotify.com/embed/artist/7hJcb9fa4alzcOq3EaNPoG?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
function displaySongRecommendation(data, spotifyID) {
  artist = data.artists[0]

  var artistBanner = document.createElement('img')
  artistBanner.src = `${artist.strArtistBanner}`
  songRecommendation.prepend(artistBanner)
  songRecommendationName.textContent = artist.strArtist;
  if (artist.strBiographyEN) songRecommendationBio.textContent = artist.strBiographyEN;
  else songRecommendationBio.textContent = '';

  var spotifyDiv = document.createElement('div')
  var iframe = document.createElement('iframe')
  iframe.src = `https://open.spotify.com/embed/artist/${spotifyID}?utm_source=generator`
  iframe.width = `100%`
  iframe.height = `380`
  iframe.frameBorder = `0`
  iframe.allowFullscreen = ''
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
  songRecommendation.appendChild(spotifyDiv)
  spotifyDiv.appendChild(iframe)
}

function displayCurrentWeather(data) {
  console.log(data)
  currentWeatherLocation.textContent = data.name

  var weatherIcon = document.createElement('img');
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  currentWeather.appendChild(weatherIcon);
  currentWeatherTemp.textContent = `${Math.floor(data.main.temp)} F`;
}

function init() {
  var currentTime = document.querySelector('#current-time')
  currentTime.textContent = moment().format('LLLL')
  if (searchTerm) getWeatherData();
}

init()


searchFormElement.addEventListener('submit',
  function (event) {
    event.preventDefault();
    var search = searchInput.value.replace(/\s/g, "+");
    if (search) location.replace(`index.html?q=${search}`);
  })
