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

const writeToDoListDataToFile = async (event, [toDoList]) => {
    console.log('write to do list');
    for(let toDoItem of toDoList) {
        console.log(`writing to do list item ${toDoItem}`);
        try{
            await fs.appendFile(c_ToDoListDataFilePath, toDoItem);
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
