import './style.scss'

let moveСounter = 0;
let pairСounter = 0;
let selectedCards = [];
let isChecking;
const MODAL_WINNER="winner";
const MODAL_TABLE="table";

document.querySelector('#app').innerHTML = `
<header>        <button class="newGame">New Game</button></header>
<main>
<section class="counters">
<div class="moveСounter">Moves:<span>0</span></div>
<div class="pairСounter">Pairs:<span>0</span>/8</div>
</section>
<section class="gameBoard" id="gameBoard"></section>
</main>
`

function startNewGame(){
  moveСounter = 0;
  pairСounter = 0;
  selectedCards = [];
  isChecking = false;

  updateСounter(moveСounter, '.moveСounter');
  updateСounter(pairСounter, '.pairСounter');
  addCards();
  setListerners();

  const modal = document.querySelector('.modal');
  if(modal){
    modal.remove();
  }
}
const images = Object.values(
  import.meta.glob('/src/assets/cards/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);

const imagesTwice = [...images, ...images];


function addCards(){
imagesTwice.sort(() => Math.random() - 0.5);

const cards = imagesTwice;
const listElement = document.querySelector('.gameBoard');

const htmlContent = cards.map((card,i)=> {
            return `<div class="card close" data-image="${card}">
                       <img class="card__image" src="${card}" alt="">
                  </div>
`;
        }).join('');
        
            listElement.innerHTML = htmlContent;

}
addCards();
setListerners();

function setListerners(){
const cards = document.querySelectorAll('.card');
 isChecking=false;
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (isChecking) {
    return;
    }
    const hasNoClass = card.classList.contains('close');
    if(!hasNoClass){
        return;
    }
    if (selectedCards.length === 2 ) return;

    card.classList.remove('close');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      moveСounter++;
      updateСounter(moveСounter,".moveСounter")
      checkMatch();
    }
  });
});
}

function checkMatch() {
  const [firstCard, secondCard] = selectedCards;
  isChecking=true;
  setTimeout(() => {

  if (firstCard.dataset.image === secondCard.dataset.image) {
      pairСounter++;
      updateСounter(pairСounter,".pairСounter")
      if(pairСounter===8){
        showModal(MODAL_WINNER);
    }
  } else {
    firstCard.classList.add("close");
    secondCard.classList.add("close");
  }
  isChecking=false;
},1500)
  selectedCards = [];
  
}


function updateСounter(count, whatCounter){
const сounter = document.querySelector(whatCounter+' span');
сounter.textContent = String(count);
}

function showModal(type){
const pairnt = document.querySelector('main');
const modal = document.createElement('div');
modal.classList.add("modal");
switch(type){
  case MODAL_WINNER:
    modal.innerHTML=`
    <div class="modal__overlay"></div>
    <div class="modal__content" >
        <h1>You win!</h1>
        <div class="moveСounter">Moves:<span>${moveСounter}</span></div>
        <div class="choice">
        <button class="newGame">New Game</button>
        <button class="close">Close</button>
        </div>
    </div>`
        break;
  case MODAL_TABLE:
    //
        break;
  default:
    return;
}
pairnt.append(modal);
const closeButton = modal.querySelector('.close');

  closeButton.addEventListener('click', () => {
    modal.remove();
  });
  
}

document.addEventListener('click', (event) => {
  const target = event.target;

  if (target instanceof Element && target.closest('.newGame')) {
    startNewGame();
  }
});