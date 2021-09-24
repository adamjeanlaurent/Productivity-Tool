import { useState } from 'react';
import './ToDoList.css'

export default function ToDoList() {
	// const crappyHashFunctionBecauseIHaveNoInternetRightNow = (string) => {
	// 	// do random shit
	// 	// this is intentially bad
	// 	const magicNumber = 5736;
	// 	let sumOfLetters = 0;
	// 	string.forEach(letter => sumOfLetters += letter.charCodeAt(0));
	// 	return magicNumber + sumOfLetters;
	// }

	const isDuplicate = (potentialNewToDoItem) => {
		for(let toDoItem of toDoList) {
			if(toDoItem === potentialNewToDoItem) {
				return true;
			}
		}
		return false;
	}

	// const writeNewToDoListItemToFileSystem = (newToDoItem) => {
    //     ipcRenderer.invoke('writeToDoListData', [
	// 		newToDoItem
    //     ]);
	// }

	// const removeToDoListItemFromFileSystem = (toDoItem) => {
	// 	ipcRenderer.invoke('removeToDoListItem', [
	// 		toDoItem
	// 	]);
	// }
	
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
		setToDoList([...toDoList, newToDoItem]);;
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