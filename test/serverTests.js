const assert = require('assert');

const { serverEndpont, getFullEndpoint } = require('./shared');

const POST_WriteToDoList = async () => {
    const endPoint = getFullEndpoint(serverEndpont, '/writeTodoList');
    
}