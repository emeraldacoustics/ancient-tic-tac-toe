let history = [Array(9).fill(null)];
let move = 0;
let cells = history[move];

function calculateWinner(cells) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (cells[a] != null && cells[a] === cells[b] && cells[a] === cells[c]) {
			return cells[a];
		}
	}
	return null;
}

function setCells(nextCells) {
	cells = nextCells;
	for (let i = 0; i < 9; i++) {
		const cell = document.getElementById('cell' + i);
		if (cells[i] == null) {
			cell.className = "cell cell-set";
			cell.innerHTML = "";
		} else {
			cell.className = "cell";
			cell.innerHTML = cells[i] ? "✘" : "✔";
		}
	}
}

function setHistory(nextHistory) {
	history = nextHistory;
}

function setNavigator() {
	const status = document.getElementById('status');
	const winner = calculateWinner(cells);
	status.innerHTML = winner == null ? (move % 2 ? "✘" : "✔") : ("⚑" + (move % 2 ? "✔" : "✘") + "⚑");
	status.className = "navigator " + (winner == null ? "on-progress" : "game-over");

	const nextBtn = document.getElementById('next');
	nextBtn.className = "navigator" + (move + 1 < history.length ? "" : " disabled");
}

function setMove(nextMove) {
	move = nextMove;
	setCells(history[move]);
	setNavigator();
}

function navigatePrev() {
	if (move > 0)
		setMove(move - 1);
}

function navigateNext() {
	if (move + 1 < history.length)
		setMove(move + 1);
}

function onPlay(nextCells) {
	let nextHistory = history.slice(0, move + 1);
	nextHistory = [...nextHistory, nextCells];
	setHistory(nextHistory);
	setMove(move + 1);
}

function handleClick(i) {
	if (cells[i] != null || calculateWinner(cells) != null)
		return;

	const nextCells = cells.slice();
	nextCells[i] = move % 2;
	onPlay(nextCells);
}

function navigateToMove(nextMove) {
	setMove(nextMove);
}

window.onload = () => {
	setCells(cells);
	setNavigator();
}