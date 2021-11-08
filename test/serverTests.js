const assert = require('assert');
const fetch = require('node-fetch');
const { TestHttpClient } = require('./shared');

const { serverEndpoint, getFullEndpoint } = require('./shared');

const POST_WriteToDoList_FileDoesNotExist = async () => {
    const endPoint = getFullEndpoint(serverEndpoint, '/writeTodoList');
    const testFilePath = './testToDoListFile';
    
    const payload = {
        toDoList : [
            'test1',
            'test2',
            'test3'
        ],
        testFilePath: testFilePath
    }

    await TestHttpClient.Post(endPoint, payload);
    
    // read file and check if in exists
}