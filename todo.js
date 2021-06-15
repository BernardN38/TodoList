//selectors
const input = document.querySelector('#todo-input');
const submitBtn = document.querySelector('#submit');
const todoList = document.querySelector('ul');
let todoLis = document.querySelectorAll('li');

//event listeners
todoList.addEventListener('click', (e) => {
	// delete and toggle functionality
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
	} else if (e.target.tagName === 'LI') {
		e.target.classList.toggle('done');
	}
	saveTodos();
});

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	//manually requiring input field and creating new entry
	if (input.value === '') {
		alert('Todo input field must be filled');
	} else {
		let newLi = document.createElement('li');
		let newBtn = document.createElement('button');
		newBtn.innerText = 'Delete';
		newLi.innerHTML = input.value;
		newLi.appendChild(newBtn);
		input.value = '';
		todoList.appendChild(newLi);
	}
	//saving changes to local storage
	saveTodos();
});

//functions
let saveTodos = () => {
	//saving list item content to local storage
	let allTodos = [];
	todoLis = document.querySelectorAll('li');
	for (let li of todoLis) {
		allTodos.push(li.innerHTML);
	}
	localStorage.setItem('todos', JSON.stringify(allTodos));

	// saving list item class toggle state to local storage
	let doneArr = [];
	for (let i = 0; i < todoLis.length; i++) {
		if (todoLis[i].classList[0] === 'done') {
			doneArr.push(1);
		} else {
			doneArr.push(0);
		}
		console.log(doneArr);
	}
	localStorage.setItem('doneArr', JSON.stringify(doneArr));
};

let retrieveTodos = () => {
	//retrieving list items from local storage
	let allTodos = JSON.parse(localStorage.getItem('todos'));
	for (let x of allTodos) {
		let newLi = document.createElement('li');
		newLi.innerHTML = x;
		todoList.appendChild(newLi);
	}

	//retrieving and applying 'done' class to list items for Local storage
	todoLis = document.querySelectorAll('li');
	let doneArr = JSON.parse(localStorage.getItem('doneArr'));
	for (let i = 0; i < doneArr.length; i++) {
		if (doneArr[i] === 1) {
			todoLis[i].classList.toggle('done');
		}
	}
};
retrieveTodos();
