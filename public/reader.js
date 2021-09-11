const fs = require('fs');

const c_filePath = './timeReport.txt';

const readFromFile = async () => {
    const data = fs.readFileSync(c_filePath, 'UTF-8');
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

module.exports = {
    readFromFile
};