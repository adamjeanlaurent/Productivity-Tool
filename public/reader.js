const fs = require('fs');
const fsSync = require('fs');

const FileSystem = require('./FileSystem');

const c_TimerDataFilePath = './timeReport.txt';
const c_ToDoListDataFilePath = './toDoListData.txt';

const readTimerDataFromFile = async () => {
    if(!FileSystem.exists(c_TimerDataFilePath)) {
        FileSystem.create(c_ToDoListDataFilePath);
        return [];
    }

    const data = FileSystem.readUTF8(c_TimerDataFilePath);
    const lines = data.split(/\r?\n/);
    const parsedData = [];

    for(let line of lines) {
        // parse    
        const [date, time, totalTime, sessionType] = line.split(' ');
        if(date && time && totalTime && sessionType) {
            parsedData.push({date: date, time: time, totalTime: parseInt(totalTime), sessionType: sessionType});
        }
    }
    return parsedData;
}

const readToDoListDataFromFile = async () => {
    if(!FileSystem.exists(c_ToDoListDataFilePath)) {
        console.log('Creating file!');
        FileSystem.create(c_ToDoListDataFilePath);
        return [];
    }

    console.log('reading data: ...');
    let parsedData = [];
    try {
        console.log('getting data');
        const data = FileSystem.readUTF8(c_ToDoListDataFilePath);
        if(!data) {
            console.log('file empty!');
            return [];
        };

        const lines = data.split(/\r?\n/);
        
        for(let line of lines) {
            // parse    
            parsedData.push(line);
        }
        return parsedData;
    }

    catch(e) {
        console.log(e.message);
        return [];
    }
}

module.exports = {
    readTimerDataFromFile,
    readToDoListDataFromFile
};