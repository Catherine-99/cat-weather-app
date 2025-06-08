# Cat Weather Widget
This is a personal project I created to experiment with packaging an app using Electron.

It’s a cute little weather widget with an animated cat that changes its outfit based on real-time weather conditions.


<img width="200" alt="Screenshot 2025-06-08 at 20 51 00" src="https://github.com/user-attachments/assets/fa486b0f-e9ff-4f57-b3a6-86f1dbf435c9" />
<img width="200" alt="Screenshot 2025-06-08 at 20 50 40" src="https://github.com/user-attachments/assets/c40a007f-d316-4116-91cc-78c8079a726f" />
<img width="200" alt="Screenshot 2025-06-08 at 20 50 18" src="https://github.com/user-attachments/assets/08e735b1-0c07-4b21-a795-5e72c1eb091c" />


## Description

This app uses the Open-Meteo geocoding and weather APIs to show the current weather and a 3-day forecast with cute animations of a cat wearing clothes that match the weather. 

Built with vanilla **HTML**, **CSS**, and **JavaScript**, and packaged as a desktop app using **Electron**.

---
## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) installed on your machine


### Run locally

1. Clone this repo:
    ```bash
   git clone https://github.com/yourusername/cat-weather-app.git
   
2. Navigate into the project folder:
   ```bash
    cd cat-weather-app

3. Install dependencies:
    ```bash
    npm install
  
4. Start the app:
    ```bash
    npm start

---
## Packaging 
### for macOS
This project uses electron-builder to package the app for macOS.

To create a macOS build:

```bash
npm run pack
```
This will generate a .app bundle in the dist folder.

### for other platforms
To package for Windows or Linux, please follow the electron-builder documentation and run the appropriate commands on the respective OS.

---
## Assets
All icons and sprites are original artwork created by me in Aseprite. Please do not reuse or steal these assets without permission. 




---

Thanks for checking out my project! Feel free to reach out if you have questions or want to contribute.





