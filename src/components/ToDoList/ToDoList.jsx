import { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { webServerURL } from '../../util/constant';
import { isFeatureEnabled } from '../../util/features';
import MyHttpClient from '../../util/MyHttpClient';
import './ToDoList.css';

const { ipcRenderer } = window.require('electron');

export default function ToDoList() {
	useEffect(async () => {
		const readToDoListFromFileSystem = async () => {
			const toDoItems = await ipcRenderer.invoke('readToDoListData');
			return toDoItems;
		}

		const existingToDoItems = await readToDoListFromFileSystem();
		setToDoList(existingToDoItems);
	}, []);

	useBeforeunload(() => {
		if (toDoList.length !== 0) {
		  writeToDoListToFileSystem();
		}
	});
	
	const isDuplicate = (potentialNewToDoItem) => {
		for(let toDoItem of toDoList) {
			if(toDoItem === potentialNewToDoItem) {
				return true;
			}
		}
		return false;
	}

	const makeWriteToDoListRequest = async () => {
		await MyHttpClient.Post(`${webServerURL}/writeTodoList`, { toDoList: toDoList });
	}

	const writeToDoListToFileSystem = async () => {
		if(!isFeatureEnabled('writeToDoListViaWebServer')) {
			try {
				await ipcRenderer.invoke('writeToDoListData', [
					toDoList
				]);
			}
	
			catch {}
		}
		else {
			await makeWriteToDoListRequest();
		}
	}
	
	const removeToDoItem = (event) => {
		const contentsOfToDoToRemove = event.target.textContent;
		// this will remove duplicates items /shrug, could use hashes or ids but this is fine lol
		const newToDoList = toDoList.filter(toDoItem => toDoItem !== contentsOfToDoToRemove);
		setToDoList(newToDoList);
	}

	const addToDoItem = (event) => {
		const ENTER_KEY = 13;
		const inputElement = document.getElementById('newToDoInput');
		const newToDoItem = inputElement.value;
		if(event.which !== ENTER_KEY || newToDoItem === '' || isDuplicate(newToDoItem)) return;
		setToDoList([...toDoList, newToDoItem]);
		inputElement.value = '';
	}

	const [toDoList, setToDoList] = useState([]);
    return (
        <div id="inlineBlock">
			<input onKeyUp={addToDoItem} type="text" placeholder="New Todo Item" id="newToDoInput"></input>
			<ul>
				{toDoList.map((toDoItem, index) => {
					return (
						<li key={index} onClick={removeToDoItem}>{toDoItem}</li>
					);
				})}
			</ul>
        </div>
    );
}