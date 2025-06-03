const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let pyProc = null;

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 680,
    minWidth: 500,
    minHeight: 680,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icon.png')  
  });

  win.loadURL('http://127.0.0.1:5000');  
  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(0.75);
    });

}

function startFlask() {
  const script = path.join(__dirname, '..', 'src', 'app.py');

  pyProc = spawn('python3', [script]);

  pyProc.stdout.on('data', (data) => {
    console.log(`Flask: ${data}`);
  });

  pyProc.stderr.on('data', (data) => {
    console.error(`Flask Error: ${data}`);
  });
}

app.whenReady().then(() => {
  startFlask();
  setTimeout(createWindow, 1000); 
});

app.on('will-quit', () => {
  if (pyProc) pyProc.kill();
});

const { ipcMain } = require('electron');

ipcMain.on('window-minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.minimize();
});

ipcMain.on('window-close', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.close();
});