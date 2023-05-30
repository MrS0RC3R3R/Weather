const ipapiUrl = 'https://ipapi.co/json/';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'a7e8689c16bddca198ae1d762f5049cd';
const imgUrl = 'http://openweathermap.org/img/wn/';






// Retrieve latitude and longitude from ipapi.co/json API
fetch(ipapiUrl)
  .then(response => response.json())
  .then(ipData => {
    const latitude = ipData.latitude;
    const longitude = ipData.longitude;

    // Make a request to OpenWeatherMap API using latitude, longitude, and API key
    const weatherApiUrl = `${openWeatherMapUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    return fetch(weatherApiUrl);
  })
  .then(response => response.json())
  .then(weatherData => {
    // Access the weather information from the OpenWeatherMap API response
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const location = weatherData.name;
    const imgCode = weatherData.weather[0].icon;
    const imgAddr = imgUrl + imgCode + "@2x.png"
    
    // Do something with the weather data
    const imageElement = document.getElementById("icon");
    const temp = document.getElementById('temperature');
    const desc = document.getElementById('description');
    const loc = document.getElementById('loc')
    temp.innerHTML = Math.round(temperature - 273);
    desc.innerHTML = description;
    loc.innerHTML = location;
    imageElement.setAttribute("src", imgAddr);

  })
  .catch(error => {
    console.log('Error:', error);
  });
