const fs = require('fs/promises');
const fsSync = require('fs');

const c_TimerDataFilePath = './timeReport.txt';
const c_ToDoListDataFilePath = './toDoListData.txt';

const writeTimerDataToFile = async (event, [ date, time, timeAllotted, sessionType ]) => {
    if(!fsSync.existsSync(c_TimerDataFilePath)) return;
    const log = `${date} ${time} ${timeAllotted} ${sessionType}\n`;
    try{
        await fs.appendFile(c_TimerDataFilePath, log);
    }
    catch(e) {
        console.log(e.message);
    }
}

const writeToDoListDataToFile = async (event, [toDoList]) => {
    console.log('write to do list ' + toDoList);
    for(let toDoItem of toDoList) {
        console.log(`writing to do list item ${toDoItem}`);
        try{
            await fs.appendFile(c_ToDoListDataFilePath, `${toDoItem}\n`);
        }
        catch(e) {
            console.log(e.message);
        }
    }
}

module.exports = {
    writeTimerDataToFile,
    writeToDoListDataToFile
}
