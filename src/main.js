import './style.scss'

document.querySelector('#app').innerHTML = `
<header></header>
<main>
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

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (selectedCards.length === 2) return;

    card.classList.remove('close');
    selectedCards.push(card);

    if (selectedCards.length === 2) {
      checkMatch();
    }
  });
});
function checkMatch() {
  const [firstCard, secondCard] = selectedCards;

  if (firstCard.dataset.image === secondCard.dataset.image) {
   //
  } else {
    setTimeout(() => {

    firstCard.classList.add("close");
    secondCard.classList.add("close");},1500)
  }

  selectedCards = [];
}