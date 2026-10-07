//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/assets/cards/Bird.png?url
var Bird_default = "/memory-game/assets/Bird-Yo7A7f0n.png";
//#endregion
//#region src/assets/cards/Earth.png?url
var Earth_default = "/memory-game/assets/Earth-o7Lugxl5.png";
//#endregion
//#region src/assets/cards/Fire_sigil.png?url
var Fire_sigil_default = "data:image/png;base64,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";
//#endregion
//#region src/assets/cards/Flower_Sigil.png?url
var Flower_Sigil_default = "/memory-game/assets/Flower_Sigil-Bc5r77Md.png";
//#endregion
//#region src/assets/cards/Light.png?url
var Light_default = "data:image/png;base64,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";
//#endregion
//#region src/assets/cards/Repetition.png?url
var Repetition_default = "/memory-game/assets/Repetition-BIqTXp4R.png";
//#endregion
//#region src/assets/cards/Water.png?url
var Water_default = "/memory-game/assets/Water-D3c5r10j.png";
//#endregion
//#region src/assets/cards/Wind.png?url
var Wind_default = "/memory-game/assets/Wind-2gg6RBLn.png";
//#endregion
//#region src/main.js
var moveCounter = 0;
var pairCounter = 0;
var selectedCards = [];
var isChecking = false;
var MODAL_WINNER = "winner";
var MODAL_TABLE = "table";
var key = "game_history";
var currentStorage;
var resultTable;
var body = document.body;
var app = document.createElement("div");
app.id = "app";
body.prepend(app);
var header = document.createElement("header");
var newGameButton = document.createElement("button");
newGameButton.classList.add("newGame");
newGameButton.textContent = "New Game";
var resultTableButton = document.createElement("button");
resultTableButton.classList.add("result-table");
resultTableButton.textContent = "Results";
header.append(newGameButton, resultTableButton);
var main = document.createElement("main");
var counters = document.createElement("section");
counters.classList.add("counters");
var moveCounterElement = document.createElement("div");
moveCounterElement.classList.add("moveCounter");
moveCounterElement.textContent = "Moves:";
var moveCounterValue = document.createElement("span");
moveCounterValue.textContent = "0";
moveCounterElement.append(moveCounterValue);
var pairCounterElement = document.createElement("div");
pairCounterElement.classList.add("pairCounter");
pairCounterElement.textContent = "Pairs:";
var pairCounterValue = document.createElement("span");
pairCounterValue.textContent = "0";
pairCounterElement.append(pairCounterValue);
pairCounterElement.append("/8");
counters.append(moveCounterElement, pairCounterElement);
var gameBoard = document.createElement("section");
gameBoard.classList.add("gameBoard");
gameBoard.id = "gameBoard";
main.append(counters, gameBoard);
app.append(header, main);
var images = Object.values([
	Bird_default,
	Earth_default,
	Fire_sigil_default,
	Flower_Sigil_default,
	Light_default,
	Repetition_default,
	Water_default,
	Wind_default
]);
var imagesTwice = [...images, ...images];
function startNewGame() {
	moveCounter = 0;
	pairCounter = 0;
	selectedCards = [];
	isChecking = false;
	updateCounter(moveCounter, ".moveCounter");
	updateCounter(pairCounter, ".pairCounter");
	addCards();
	getResults();
	const modal = document.querySelector(".modal");
	if (modal) modal.remove();
}
function addCards() {
	imagesTwice.sort(() => Math.random() - .5);
	gameBoard.replaceChildren();
	imagesTwice.forEach((image) => {
		const card = document.createElement("div");
		card.classList.add("card", "close");
		card.dataset.image = image;
		const cardImage = document.createElement("img");
		cardImage.classList.add("card__image");
		cardImage.src = image;
		cardImage.alt = "";
		card.append(cardImage);
		gameBoard.append(card);
	});
	setListeners();
}
function setListeners() {
	document.querySelectorAll(".card").forEach((card) => {
		card.addEventListener("click", () => {
			if (isChecking) return;
			if (!card.classList.contains("close")) return;
			if (selectedCards.length === 2) return;
			card.classList.remove("close");
			selectedCards.push(card);
			if (selectedCards.length === 2) {
				moveCounter++;
				updateCounter(moveCounter, ".moveCounter");
				checkMatch();
			}
		});
	});
}
function checkMatch() {
	const [firstCard, secondCard] = selectedCards;
	isChecking = true;
	setTimeout(() => {
		if (firstCard.dataset.image === secondCard.dataset.image) {
			pairCounter++;
			updateCounter(pairCounter, ".pairCounter");
			if (pairCounter === 8) {
				saveUniqueGameObject({
					date: (/* @__PURE__ */ new Date()).toLocaleDateString("ru-RU"),
					moves: moveCounter
				});
				showModal(MODAL_WINNER);
			}
		} else {
			firstCard.classList.add("close");
			secondCard.classList.add("close");
		}
		selectedCards = [];
		isChecking = false;
	}, 1500);
}
function updateCounter(count, whatCounter) {
	const counter = document.querySelector(`${whatCounter} span`);
	if (counter) counter.textContent = String(count);
}
function showModal(type) {
	const modal = document.createElement("div");
	modal.classList.add("modal");
	const overlay = document.createElement("div");
	overlay.classList.add("modal__overlay");
	const content = document.createElement("div");
	content.classList.add("modal__content");
	const choice = document.createElement("div");
	choice.classList.add("choice");
	const newGameButton = document.createElement("button");
	newGameButton.classList.add("newGame");
	newGameButton.textContent = "New Game";
	const closeButton = document.createElement("button");
	closeButton.classList.add("close");
	closeButton.textContent = "Close";
	choice.append(newGameButton, closeButton);
	switch (type) {
		case MODAL_WINNER: {
			const title = document.createElement("h1");
			title.textContent = "You win!";
			const moves = document.createElement("div");
			moves.classList.add("moveCounter");
			moves.textContent = "Moves:";
			const movesValue = document.createElement("span");
			movesValue.textContent = String(moveCounter);
			moves.append(movesValue);
			content.append(title, moves, choice);
			break;
		}
		case MODAL_TABLE: {
			const title = document.createElement("h1");
			title.textContent = "Top 10 results";
			getResults();
			if (resultTable.length > 0) {
				const table = document.createElement("table");
				table.classList.add("results");
				resultTable.forEach((result, i) => {
					const tr = document.createElement("tr");
					const td = document.createElement("td");
					td.textContent = i + 1;
					const td1 = document.createElement("td");
					td1.textContent = result.date;
					const td2 = document.createElement("td");
					td2.textContent = result.moves;
					tr.append(td, td1, td2);
					table.append(tr);
				});
				content.append(title, table);
			} else {
				const p = document.createElement("p");
				p.textContent = "There's no results yet";
				content.append(title, p);
			}
			break;
		}
		default: return;
	}
	content.append(choice);
	modal.append(overlay, content);
	closeButton.addEventListener("click", () => {
		modal.remove();
	});
	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") modal.remove();
	});
	modal.querySelector(".modal__overlay").addEventListener("click", () => modal.remove());
	app.append(modal);
}
newGameButton.addEventListener("click", startNewGame);
resultTableButton.addEventListener("click", () => showModal(MODAL_TABLE));
addCards();
getResults();
document.addEventListener("click", (event) => {
	const target = event.target;
	if (target instanceof Element && target.closest(".newGame")) startNewGame();
});
function getResults() {
	currentStorage = localStorage.getItem(key);
	resultTable = currentStorage ? JSON.parse(currentStorage) : [];
}
var saveUniqueGameObject = (newResult) => {
	if (resultTable.some((item) => item.date === newResult.date && item.moves === newResult.moves)) return;
	resultTable.push(newResult);
	resultTable.sort((a, b) => {
		return a.moves - b.moves || a.date - b.date;
	});
	const limitedList = resultTable.slice(0, 10);
	localStorage.setItem(key, JSON.stringify(limitedList));
};
//#endregion

//# sourceMappingURL=index-2Us4hmtp.js.map