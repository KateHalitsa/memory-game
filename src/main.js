import './style.scss';

let moveCounter = 0;
let pairCounter = 0;
let selectedCards = [];
let isChecking = false;

const MODAL_WINNER = 'winner';
const MODAL_TABLE = 'table';

const key="game_history"
let currentStorage;
let resultTable;

const app = document.querySelector('#app');

const header = document.createElement('header');

const newGameButton = document.createElement('button');
newGameButton.classList.add('newGame');
newGameButton.textContent = 'New Game';

const resultTableButton = document.createElement('button');
resultTableButton.classList.add('result-table');
resultTableButton.textContent = 'Results';

header.append(newGameButton,resultTableButton);

const main = document.createElement('main');

const counters = document.createElement('section');
counters.classList.add('counters');

const moveCounterElement = document.createElement('div');
moveCounterElement.classList.add('moveCounter');
moveCounterElement.textContent = 'Moves:';

const moveCounterValue = document.createElement('span');
moveCounterValue.textContent = '0';

moveCounterElement.append(moveCounterValue);

const pairCounterElement = document.createElement('div');
pairCounterElement.classList.add('pairCounter');
pairCounterElement.textContent = 'Pairs:';

const pairCounterValue = document.createElement('span');
pairCounterValue.textContent = '0';

pairCounterElement.append(pairCounterValue);

pairCounterElement.append('/8');

counters.append(moveCounterElement, pairCounterElement);

const gameBoard = document.createElement('section');
gameBoard.classList.add('gameBoard');
gameBoard.id = 'gameBoard';

main.append(counters, gameBoard);
app.append(header, main);


const images = Object.values(
  import.meta.glob('/src/assets/cards/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);

const imagesTwice = [...images, ...images];


function startNewGame() {
  moveCounter = 0;
  pairCounter = 0;
  selectedCards = [];
  isChecking = false;

  updateCounter(moveCounter, '.moveCounter');
  updateCounter(pairCounter, '.pairCounter');

  addCards();
  getResults();

  const modal = document.querySelector('.modal');

  if (modal) {
    modal.remove();
  }
}


function addCards() {
  imagesTwice.sort(() => Math.random() - 0.5);

  gameBoard.replaceChildren();

  imagesTwice.forEach((image) => {
    const card = document.createElement('div');
    card.classList.add('card', 'close');
    card.dataset.image = image;

    const cardImage = document.createElement('img');
    cardImage.classList.add('card__image');
    cardImage.src = image;
    cardImage.alt = '';

    card.append(cardImage);
    gameBoard.append(card);
  });

  setListeners();
}


function setListeners() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (isChecking) {
        return;
      }

      if (!card.classList.contains('close')) {
        return;
      }

      if (selectedCards.length === 2) {
        return;
      }

      card.classList.remove('close');
      selectedCards.push(card);

      if (selectedCards.length === 2) {
        moveCounter++;

        updateCounter(moveCounter, '.moveCounter');

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

      updateCounter(pairCounter, '.pairCounter');

      if (pairCounter === 8) {
        saveUniqueGameObject({date: new Date().toLocaleDateString('ru-RU'),moves: moveCounter});
        showModal(MODAL_WINNER);
      }
    } else {
      firstCard.classList.add('close');
      secondCard.classList.add('close');
    }

    selectedCards = [];
    isChecking = false;
  }, 1500);
}


function updateCounter(count, whatCounter) {
  const counter = document.querySelector(`${whatCounter} span`);

  if (counter) {
    counter.textContent = String(count);
  }
}


function showModal(type) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
const overlay = document.createElement('div');
      overlay.classList.add('modal__overlay');

      const content = document.createElement('div');
      content.classList.add('modal__content');
      const choice = document.createElement('div');
      choice.classList.add('choice');

      const newGameButton = document.createElement('button');
      newGameButton.classList.add('newGame');
      newGameButton.textContent = 'New Game';

      const closeButton = document.createElement('button');
      closeButton.classList.add('close');
      closeButton.textContent = 'Close';

      choice.append(newGameButton, closeButton);
      
  switch (type) {
    case MODAL_WINNER: {
      
      const title = document.createElement('h1');
      title.textContent = 'You win!';

      const moves = document.createElement('div');
      moves.classList.add('moveCounter');
      moves.textContent = 'Moves:';

      const movesValue = document.createElement('span');
      movesValue.textContent = String(moveCounter);

      moves.append(movesValue);

      content.append(title, moves, choice);
      
      break;
    }

    case MODAL_TABLE:
      {
        const title = document.createElement('h1');
      title.textContent = 'Top 10 results';
      getResults();
      if(resultTable.length>0){
        
      const table = document.createElement('table');
      table.classList.add('results');

      resultTable.forEach((result,i)=>{
        const tr = document.createElement('tr');
        const td= document.createElement('td');
        td.textContent=i+1;
        const td1= document.createElement('td');
        td1.textContent=result.date;
        const td2 = document.createElement('td');
        td2.textContent=result.moves;
        tr.append(td,td1,td2);
        table.append(tr);
      });
      content.append(title,table);

      }else{
        const p = document.createElement('p');
        p.textContent="There's no results yet";
        content.append(title,p);
      }

      break;
      }
    default:
      return;
  }      content.append( choice);

      modal.append(overlay, content);
      closeButton.addEventListener('click', () => {
        modal.remove();
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
              modal.remove();
        }
      });
      const backdrop = modal.querySelector('.modal__overlay');

      backdrop.addEventListener('click', ()=> modal.remove());

  app.append(modal);
}


newGameButton.addEventListener('click', startNewGame);
resultTableButton.addEventListener('click', ()=>showModal(MODAL_TABLE));

addCards();
getResults();

document.addEventListener('click', (event) => {
  const target = event.target;

  if (target instanceof Element && target.closest('.newGame')) {
    startNewGame();
  }
});
function getResults(){
 currentStorage = localStorage.getItem(key);
 resultTable = currentStorage ? JSON.parse(currentStorage) : [];
}

const saveUniqueGameObject = (newResult) => {
  
  const isDuplicate = resultTable.some(
    item => item.date === newResult.date && item.moves === newResult.moves
  );

  if (isDuplicate) {
    return; 
  }

  resultTable.push(newResult);

  resultTable.sort((a, b) => {return a.moves - b.moves||a.date - b.date});

  const limitedList = resultTable.slice(0, 10);
  localStorage.setItem(key, JSON.stringify(limitedList));
};