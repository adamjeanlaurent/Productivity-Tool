const { app, BrowserWindow , ipcMain} = require('electron');
const { writeTimerDataToFile, writeToDoListDataToFile } = require('./writer');
const { readTimerDataFromFile, readToDoListDataFromFile } = require('./reader');
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

    window.webContents.setBackgroundThrottling(false); // https://github.com/electron/electron/issues/7079
    window.webContents.openDevTools();
    window.loadURL('http://localhost:3000');
}

ipcMain.handle('writeTimerData', writeTimerDataToFile);
ipcMain.handle('readTimerData', readTimerDataFromFile);

ipcMain.handle('writeToDoListData', writeToDoListDataToFile);
ipcMain.handle('readToDoListData', readToDoListDataFromFile);

app.on('ready', createWindow);