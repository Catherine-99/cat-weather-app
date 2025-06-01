//switch between screen 1 (set location) and screen 2 (view weather forecast)
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

//goButton.addEventListener('click', switchToWeather);
backButton.addEventListener('click', switchToLocation);

//cat animation 
const canvas = document.getElementById('cat-animation');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width = 230;
const canvasHeight = canvas.height = 230;

const catImage = new Image();
catImage.src = '/src/static/assets/catsprites.png';
context.imageSmoothingEnabled = false;

const spriteWidth = 64;
const spriteHeight = 64;

let frameX = 0;

//frameY is which cat to display according to the weather 
let frameY = 0;
let frame = 0;
const staggerFrames = 20;

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


//render correct animation
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
    } else if (weather ==='thunderstorms') {
        frameY = 5
    }
// cat 0 --> overcast, foggy; cat 1 --> cloudy, windy; cat 2 --> snowy; cat 3 --> rainy, hailing; cat 4 --> sunny
// cat 5 --> thunderstorms
}



//render weather icons and forecast
function renderWeatherData(data){
    let weatherConditions = data['current_conditions']
    let weatherIcon = document.getElementById('weather-icon');
    let iconSrc = `/src/static/assets/${weatherConditions}.png`;

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

    let dayTwoIcon = document.getElementById('day-two-icon');
    let dayTwoText = document.getElementById('day-two-text');

    let dayThreeIcon = document.getElementById('day-three-icon');
    let dayThreeText = document.getElementById('day-three-text');

    let dayOneCond = data['forecast']['weather_codes'][1];
    let dayOneDay = data['forecast']['days'][1];

    let dayTwoCond = data['forecast']['weather_codes'][2];
    let dayTwoDay = data['forecast']['days'][2];

    let dayThreeCond = data['forecast']['weather_codes'][3];
    let dayThreeDay = data['forecast']['days'][3];

    dayOneIcon.src = `/src/static/assets/${dayOneCond}.png`
    dayOneText.textContent = dayOneDay

    dayTwoIcon.src = `/src/static/assets/${dayTwoCond}.png`
    dayTwoText.textContent = dayTwoDay

    dayThreeIcon.src = `/src/static/assets/${dayThreeCond}.png`
    dayThreeText.textContent = dayThreeDay
}


//get weather data based on location and render data
goButton.addEventListener('click', async() => {
    let cityInput = document.getElementById('location-input').value;

    if (!cityInput) {
        alert('Please enter your city');
        return 
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/get-weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({city: cityInput})
        });

        const data = await response.json();  
        
        console.log(data);

        switchToWeather();
        renderWeatherData(data);
        renderWeatherText(data)
        renderForecast(data);
        renderAnimation(data)

        if (!response.ok) throw new Error('Network not responding');  
    } 
    
    catch (error) {
        console.error('error fetching weather data:', error)
    }
});

