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

goButton.addEventListener('click', switchToWeather)
backButton.addEventListener('click', switchToLocation)