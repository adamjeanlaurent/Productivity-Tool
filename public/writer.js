const fs = require('fs/promises');
const fsSync = require('fs');

const FileSystem = require('./FileSystem');

const c_TimerDataFilePath = './timeReport.txt';
const c_ToDoListDataFilePath = './toDoListData.txt';

const writeTimerDataToFile = async (event, [ date, time, timeAllotted, sessionType ]) => {
    if(!FileSystem.exists(c_TimerDataFilePath)) {
        FileSystem.create(c_TimerDataFilePath);
    }
    const log = `${date} ${time} ${timeAllotted} ${sessionType}\n`;
    try{
        await FileSystem.write(c_TimerDataFilePath, log);
    }
    catch(e) {
        console.log(e.message);
    }
}

const writeToDoListDataToFile = async (event, [toDoList]) => {
    if(FileSystem.exists(c_ToDoListDataFilePath)) {
        FileSystem.delete(c_ToDoListDataFilePath);
        FileSystem.create(c_ToDoListDataFilePath);
    }

    console.log('write to do list ' + toDoList);
    for(let toDoItem of toDoList) {
        console.log(`writing to do list item ${toDoItem}`);
        try{
            await FileSystem.write(c_ToDoListDataFilePath, `${toDoItem}\n`);
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
