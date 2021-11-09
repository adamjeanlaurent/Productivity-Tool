const express = require('express');
const fsAsync = require('fs/promises');
const fsSync = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));

const c_ToDoListDataFilePath = './toDoListData.txt';

// this is lazy but i'm too lazy to figure out coding sharing between projects :)
class FileSystem {
    static create(filepath) {
        fsSync.closeSync(fsSync.openSync(filepath, 'w'));
    }

    static delete(filepath) {
        fsSync.unlinkSync(filepath);
    }

    static exists(filepath) {
       return fsSync.existsSync(filepath);
    }

    static async write(filepath, line) {
        await fsAsync.appendFile(filepath, line);
    }

    static readUTF8(filepath) {
        fsSync.readFileSync(filepath, 'UTF-8');
    }
}

class Logger {
    static r(t) {
        console.log(colors.red(t));
    }
    static g(t) {
        console.log(colors.green(t));
    }
    static b(t) {
        console.log(colors.blue(t));
    }
    static timeStamp(event) {
        const date = new Date();
        console.log(`${formatAMPM(date)}\nEvent: ${event}`);
    }
    static heartbeat() {
        const date = new Date();
        console.log(`${formatAMPM(date)}: 💖`);
    }
}

app.post('/writeTodoList', async (req, res) => {
    if(FileSystem.exists(c_ToDoListDataFilePath)) {
        Logger.b('deleting ' + c_ToDoListDataFilePath);
        FileSystem.delete(c_ToDoListDataFilePath);
        Logger.b('creating ' + c_ToDoListDataFilePath);
        FileSystem.create(c_ToDoListDataFilePath);
    }
    else {
        FileSystem.create(c_ToDoListDataFilePath);
        Logger.b('creating ' + c_ToDoListDataFilePath);
    }

    const toDoList = req.body.toDoList;

    Logger.g(req.body);
    Logger.g(toDoList);

    if(!toDoList) {
        Logger.r('Error! to do list is empty!');
        return;
    }

    Logger.b('write to do list ' + toDoList);
    for(let toDoItem of toDoList) {
        Logger.b(`writing to do list item ${toDoItem}`);
        try{
            await FileSystem.write(c_ToDoListDataFilePath, `${toDoItem}\n`);
        }
        catch(e) {
            console.log(e.message);
        }
    }
});

app.listen(6532, () => {
    Logger.b('server running!');
});
