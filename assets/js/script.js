var searchTerm = "Charlotte";
var weatherToken = `dada7bf4d9f14d708e8eabdc7768b323`;


var test = document.querySelector('#test')


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
      case "Rain": recommendation;
        break;
      case "Snow": recommendation;
        break;
      case "Mist": recommendation;
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
      case "Haze" || "Fog": recommendation = [{
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
  console.log(recommendation);
  var randArtist = recommendation[Math.floor(Math.random() * recommendation.length)]
  console.log(randArtist);
  var apiUrl = `https://theaudiodb.com/api/v1/json/2/search.php?s=${randArtist.artist}`
  console.log(apiUrl);

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
  console.log(artist.strArtistBanner)
  artistBanner.src = `${artist.strArtistBanner}`
  test.appendChild(artistBanner)
  var spotifyDiv = document.createElement('div')
  var iframe = document.createElement('iframe')
  iframe.src = `https://open.spotify.com/embed/artist/${spotifyID}?utm_source=generator`
  iframe.width = `100%`
  iframe.height = `380`
  iframe.frameBorder = `0`
  iframe.allowFullscreen = ''
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
  test.appendChild(spotifyDiv)
  spotifyDiv.appendChild(iframe)
}

getWeatherData()

