const fs = require('fs/promises');

const c_filePath = './timeReport.txt';

const writeToFile = async (event, [ date, time, timeAllotted, sessionType ]) => {
    const log = `${date} ${time} ${timeAllotted} ${sessionType}\n`;
    try{
        await fs.appendFile(c_filePath, log);
    }
    catch(e) {
        console.log(e.message);
    }
}

module.exports = {
    writeToFile
}
