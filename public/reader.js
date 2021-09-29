const fs = require('fs');

const c_TimerDataFilePath = './timeReport.txt';
const c_ToDoListDataFilePath = './toDoListData.txt';

const readTimerDataFromFile = async () => {
    const data = fs.readFileSync(c_TimerDataFilePath, 'UTF-8');
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
    console.log('reading data: ...');
    let parsedData = [];
    try {
        console.log('getting data');
        const data = fs.readFileSync(c_ToDoListDataFilePath, 'UTF-8');
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
   
   
    // const lines = data.split(/\r?\n/);
}

module.exports = {
    readTimerDataFromFile,
    readToDoListDataFromFile
};