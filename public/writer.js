const fs = require('fs/promises');

const c_TimerDataFilePath = './timeReport.txt';
const c_ToDoListDataFilePath = './toDoListData.txt';

const writeTimerDataToFile = async (event, [ date, time, timeAllotted, sessionType ]) => {
    const log = `${date} ${time} ${timeAllotted} ${sessionType}\n`;
    try{
        await fs.appendFile(c_TimerDataFilePath, log);
    }
    catch(e) {
        console.log(e.message);
    }
}

// const writeToDoListDataToFile = async (event, [item]) => {
//     try{
//         await fs.appendFile(c_ToDoListDataFilePath, log);
//     }
//     catch(e) {
//         console.log(e.message);
//     }
// }

module.exports = {
    writeTimerDataToFile,
    // writeToDoListDataToFile
}
