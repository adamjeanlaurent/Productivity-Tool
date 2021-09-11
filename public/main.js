const { app, BrowserWindow , ipcMain} = require('electron');
const { writeToFile } = require('./writer');
const { readFromFile } = require('./reader');
require('@electron/remote/main').initialize();

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    window.webContents.openDevTools();
    window.loadURL('http://localhost:3000');
}

ipcMain.handle('write', writeToFile);
ipcMain.handle('read', readFromFile);

app.on('ready', createWindow);