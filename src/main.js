import './style.scss';

let moveCounter = 0;
let pairCounter = 0;
let selectedCards = [];
let isChecking = false;

const MODAL_WINNER = 'winner';
const MODAL_TABLE = 'table';

const app = document.querySelector('#app');

const header = document.createElement('header');

const newGameButton = document.createElement('button');
newGameButton.classList.add('newGame');
newGameButton.textContent = 'New Game';

header.append(newGameButton);

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
      break;

    default:
      return;
  }
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

  main.append(modal);
}


newGameButton.addEventListener('click', startNewGame);

addCards();
document.addEventListener('click', (event) => {
  const target = event.target;

  if (target instanceof Element && target.closest('.newGame')) {
    startNewGame();
  }
});


