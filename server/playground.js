const deleteAndCreateFile = (path) => {
    fsSync.unlinkSync(path);
    fsSync.openSync(path, 'w');
}

const test = () => {
    await fs.appendFile(c_ToDoListDataFilePath, `${toDoItem}\n`);
}