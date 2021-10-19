const express = require('express');
const fs = require('fs/promises');
const fsSync = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const c_ToDoListDataFilePath = './toDoListData.txt';

const deleteAndCreateFile = (path) => {
    fsSync.unlinkSync(path);
    fsSync.openSync(path, 'w');
}

app.post('/writeTodoList', async (req, res) => {
    deleteAndCreateFile(c_ToDoListDataFilePath);
    const toDoList = req.body.toDoList;

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
});

app.listen(6532, () => {
    console.log('server running!');
});
