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

goButton.addEventListener('click', switchToWeather);
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


//get weather data based on location 

//get location input from user, send this to the backend, retrieve coordinates in th ebackend
//then retrieve weather data and forecast in backend
//send data to front end
//display correct cat animation, weather icon, forecast icon and weekdays 
//