import './style.scss'

let moveСounter = 0;
let pareСounter = 0;
document.querySelector('#app').innerHTML = `
<header></header>
<main>
<section class="counters">
<div class="moveСounter">Moves:<span>0</span></div>
<div class="pareСounter">Pares:<span>0</span>/8</div>
</section>
<section class="gameBoard" id="gameBoard"></section>
</main>
`
const images = Object.values(
  import.meta.glob('/src/assets/cards/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);
const imagesTwice = [...images, ...images];

imagesTwice.sort(() => Math.random() - 0.5);

function addCards(){
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
let selectedCards = [];
const cards = document.querySelectorAll('.card');
let isCheacking=false;
cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (isCheacking) {
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
function checkMatch() {
  const [firstCard, secondCard] = selectedCards;
  isCheacking=true;
  setTimeout(() => {

  if (firstCard.dataset.image === secondCard.dataset.image) {
      pareСounter++;
      updateСounter(pareСounter,".pareСounter")
  } else {
    firstCard.classList.add("close");
    secondCard.classList.add("close");
  }
  isCheacking=false;
},1500)
  selectedCards = [];
}


function updateСounter(count, whatCounter){
const сounter = document.querySelector(whatCounter+' span');
сounter.textContent = String(count);
}
