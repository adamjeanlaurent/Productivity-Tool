const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const c_ToDoListDataFilePath = './toDoListData.txt';

app.post('/writeTodoList', async (req, res) => {
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
