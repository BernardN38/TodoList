const gameContainer = document.getElementById('game');
const restartButton = document.querySelector('#restart');
const tries = document.querySelector('#counter');
const highscore = document.querySelector('#highscore');

let COLORS = [];
const makeColors = () => {
	let colorsList = [ 'red', 'blue', 'green', 'orange', 'purple', 'yellow', 'teal' ];
	let x = 0;
	while (x < 2) {
		for (let i = 0; i < colorsList.length; i++) {
			if (Math.random() > 0.65) {
				COLORS.push(colorsList[i]);
				COLORS.push(colorsList[i]);
			}
		}
		x++;
	}
};
makeColors();
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	let id = 0;
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// add unique id to each card
		newDiv.setAttribute('id', id);
		id++;
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	flipCard(event);
}

// when the DOM loads
createDivsForColors(shuffledColors);

//my code

let cardsFlipped = 0;
let twoCards = [];
let saveCards = [];
let counter = 0;
tries.innerText = counter;
highscore.innerText = JSON.parse(localStorage.getItem('highscore'));
let freeze = false;

let changeColor = (event) => {
	event.target.style.backgroundColor = event.target.classList[0];
	freeze = false;
};

let flipCard = (event) => {
	if (freeze === false) {
		let card = [ event.target.classList[0], event.target.id ];
		if (cardsFlipped != 2) {
			freeze = true;
			twoCards.push(card);
			cardsFlipped++;
			changeColor(event);
		}
		if (cardsFlipped === 2) {
			freeze = true;
			if (twoCards[0][0] === twoCards[1][0] && twoCards[0][1] != twoCards[1][1]) {
				saveCards.push(twoCards[0][1], twoCards[1][1]);
				cardsFlipped = 0;
				twoCards = [];
				checkGame();
				freeze = false;
			} else if (twoCards[0][0] != twoCards[1][0] || twoCards[0][1] === twoCards[1][1]) {
				setTimeout(clearCards, 1000);
			}
		}
	} else {
		return;
	}
};

let clearCards = () => {
	try {
		if (!saveCards.includes(gameContainer.children[twoCards[0][1]].id)) {
			gameContainer.children[twoCards[0][1]].setAttribute('style', 'none');
		}
		if (!saveCards.includes(gameContainer.children[twoCards[1][1]].id)) {
			gameContainer.children[twoCards[1][1]].setAttribute('style', 'none');
		}
	} catch (e) {}
	try {
		if (
			!saveCards.includes(gameContainer.children[twoCards[1][1]].id) &&
			!saveCards.includes(gameContainer.children[twoCards[0][1]].id) &&
			gameContainer.children[twoCards[1][1]].id != gameContainer.children[twoCards[0][1]].id &&
			twoCards.length === 2
		) {
			counter++;
			tries.innerText = counter;
		}
	} catch (e) {}
	cardsFlipped = 0;
	twoCards = [];
	freeze = false;
};

let restart = (e) => {
	e.preventDefault();
	gameContainer.innerHTML = '';
	COLORS = [];
	makeColors();
	let shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
	cardsFlipped = 0;
	twoCards = [];
	saveCards = [];
	counter = 0;
	tries.innerText = counter;
	highscore.innerText = JSON.parse(localStorage.getItem('highscore'));
};

let checkGame = () => {
	let win = COLORS.length;
	for (let x of gameContainer.children) {
		if (x.style.backgroundColor === x.classList[0]) {
			win--;
		}
	}
	if (win === 0) {
		setTimeout(() => {
			alert(`Game won in ${counter} tries!`);
			highscore.innerText = JSON.parse(localStorage.getItem('highscore'));
		}, 100);
		let gameScore = counter;
		localStorage.setItem('score', JSON.stringify(gameScore));
		let bestscore = localStorage.getItem('highscore', JSON.parse(localStorage.getItem('highscore')));

		if (gameScore < bestscore) {
			localStorage.setItem('highscore', JSON.stringify(gameScore));
		}
	}
};

restartButton.addEventListener('click', restart);
