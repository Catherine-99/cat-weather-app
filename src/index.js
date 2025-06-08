//Toggle between states
const goButton = document.getElementById('go-button');
const backButton = document.getElementById('back-button');

const screenOne = document.getElementById('set-location')
const screenTwo = document.getElementById('main-container');

function switchToWeather() {
    screenOne.style.display = 'none';
    screenTwo.style.display = 'flex';
    backButton.style.display = 'block';
}

function switchToLocation() {
    screenOne.style.display = 'flex';
    screenTwo.style.display = 'none';
    backButton.style.display = 'none';
}

backButton.addEventListener('click', ()=> {
     switchToLocation();
});


//cat animation 
const canvas = document.getElementById('cat-animation');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width = 230;
const canvasHeight = canvas.height = 230;

const catImage = new Image();
catImage.src = 'assets/catsprites.png';
context.imageSmoothingEnabled = false;

const spriteWidth = 64;
const spriteHeight = 64;

let frameX = 0;

//frameY = which cat to display according to the weather 
let frameY = 0;
let frame = 0;
const staggerFrames = 20; //animation speed

function animate(){
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(catImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, canvasWidth, canvasHeight,);
    if (frame % staggerFrames == 0){
        if (frameX < 4) frameX++;
        else frameX = 0;
    }
    frame++;
    requestAnimationFrame(animate);
}
animate();

//render corresponding animation
function renderAnimation(data){
    let weather = data['current_conditions']
    if (weather === 'overcast' || weather === 'foggy') {
        frameY = 0;
    } else if (weather === 'cloudy' || weather === 'windy') {
        frameY = 1
    } else if (weather === 'snowy') {
        frameY = 2
    } else if (weather === 'rainy' || weather === 'hailing') {
        frameY = 3 
    } else if (weather ==='sunny') {
        frameY = 4
    } else if (weather ==='thunderstorm') {
        frameY = 5
    }
// cat 0 --> overcast, foggy; cat 1 --> cloudy, windy; cat 2 --> snowy; cat 3 --> rainy, hailing; cat 4 --> sunny
// cat 5 --> thunderstorms
}

const weatherIconMap = {
    0: "sunny",
    1: "cloudy",
    2: "cloudy",
    3: "overcast",
    45: "foggy",
    48: "foggy",
    51: "rainy",
    53: "rainy",
    55: "rainy",
    56: "hail",
    57: "hail",
    61: "rainy",
    63: "rainy",
    65: "rainy",
    66: "hail",
    67: "hail",
    71: "snowy",
    73: "snowy",
    75: "snowy",
    77: "snowy",
    80: "rainy",
    81: "rainy",
    82: "rainy",
    85: "snowy",
    86: "snowy",
    95: "thunderstorm",
    96: "thunderstorm",
    99: "thunderstorm"
  };

  

//render weather icons and forecast
function renderWeatherData(data){
    let weatherConditions = data['current_conditions']
    let weatherIcon = document.getElementById('weather-icon');
    let iconSrc = `assets/${weatherConditions}.png`;

    weatherIcon.src = iconSrc;
    console.log(iconSrc)
}


//render weather text
function renderWeatherText(data){
    let tempDisplay = document.getElementById('weather-status');
    let currentTemp = data['current_temp'];
    let currentCond = data['current_conditions'];

    tempDisplay.textContent = `${currentTemp}°C / ${currentCond}`
}

//render forecast 
function renderForecast(data){
    let dayOneIcon = document.getElementById('day-one-icon');
    let dayOneText = document.getElementById('day-one-text');
    let dayOneTempText = document.getElementById('day-one-temp');

    let dayTwoIcon = document.getElementById('day-two-icon');
    let dayTwoText = document.getElementById('day-two-text');
    let dayTwoTempText = document.getElementById('day-two-temp');

    let dayThreeIcon = document.getElementById('day-three-icon');
    let dayThreeText = document.getElementById('day-three-text');
    let dayThreeTempText = document.getElementById('day-three-temp');

    let dayOneCond = data['cond_day_1'];
    let dayOneDay = data['date_day_1'];
    let dayOneTemp = data['temp_day_1'];

    let dayTwoCond = data['cond_day_2'];
    let dayTwoDay = data['date_day_2'];
    let dayTwoTemp = data['temp_day_2'];

    let dayThreeCond = data['cond_day_3'];
    let dayThreeDay = data['date_day_3'];
    let dayThreeTemp = data['temp_day_3'];

    dayOneIcon.src = `assets/${dayOneCond}.png`;
    dayOneText.textContent = dayOneDay;
    dayOneTempText.textContent = `${dayOneTemp}°C`;

    dayTwoIcon.src = `assets/${dayTwoCond}.png`;
    dayTwoText.textContent = dayTwoDay;
    dayTwoTempText.textContent = `${dayTwoTemp}°C`;

    dayThreeIcon.src = `assets/${dayThreeCond}.png`;
    dayThreeText.textContent = dayThreeDay;
    dayThreeTempText.textContent = `${dayThreeTemp}°C`;
}



//function to fetch coordinates
async function fetchUserCoordinates(){
    let user_location = document.getElementById("location-input").value;
    //check if user entered a location, if not alert to enter
    if (!user_location) {
        alert("enter a location");
        return; 
      }
    const coordinates_url = `https://geocoding-api.open-meteo.com/v1/search?name=${user_location}`;

    const response = await fetch(coordinates_url);
    const data = await response.json();

    console.log(data);

    let longitude = data.results[0].longitude
    let latitude = data.results[0].latitude
    console.log(longitude,latitude)

    fetchWeatherData(longitude, latitude)
    //get lat and lon, make variable for city name get from user input 
    //fetch weather data using lat and lon
    //render page 2 based on weather codes
}


//convert date to weekday abbreviation for forecasts
function getShortWeekday(date) {
    const dateString = new Date(date);
    const options = { weekday: 'short' };
    return dateString.toLocaleDateString('en-US', options);
  }

//fetch weather data 
async function fetchWeatherData(lon, lat){
    let weather_api_url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max%2Ctemperature_2m_min%2Cweathercode&forecast_days=4&timezone=auto`
    
    const response = await fetch(weather_api_url);
    const data = await response.json();

    let weatherCode = data['current_weather']['weathercode'];
    let current_weather = weatherIconMap[weatherCode];

    let current_temp = data['current_weather']['temperature'];
    console.log(current_weather);

    let forecast_temp_day_one = data['daily']['temperature_2m_max'][1];
    let forecast_date_day_one = getShortWeekday(data['daily']['time'][1]);
    let forecast_cond_day_one = data['daily']['weathercode'][1];

    let forecast_temp_day_two = data['daily']['temperature_2m_max'][2];
    let forecast_date_day_two = getShortWeekday(data['daily']['time'][2]);
    let forecast_cond_day_two = data['daily']['weathercode'][2];

    let forecast_temp_day_three = data['daily']['temperature_2m_max'][3];
    let forecast_date_day_three = getShortWeekday(data['daily']['time'][3]);
    let forecast_cond_day_three = data['daily']['weathercode'][3];

    let weather_data = {
        'current_conditions': current_weather,
        'current_temp': current_temp,
        'temp_day_1': forecast_temp_day_one,
        'date_day_1': forecast_date_day_one,
        'cond_day_1': weatherIconMap[forecast_cond_day_one],
        'temp_day_2': forecast_temp_day_two,
        'date_day_2': forecast_date_day_two,
        'cond_day_2': weatherIconMap[forecast_cond_day_two],
        'temp_day_3': forecast_temp_day_three,
        'date_day_3': forecast_date_day_three,
        'cond_day_3': weatherIconMap[forecast_cond_day_three],
    };

    renderWeatherData(weather_data);
    renderWeatherText(weather_data);
    renderAnimation(weather_data);
    renderForecast(weather_data)
    switchToWeather()
}


//get weather data based on location and render data when user clicks go button
goButton.addEventListener('click', fetchUserCoordinates);


//make close and minimise buttons functional with electron
const minimiseButton = document.getElementById('minimise-button');
const closeButton = document.getElementById('close-button');

