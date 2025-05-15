let cards = [];
let currentIndex = 0;
let flipped = false;

async function loadCards() {
  const res = await fetch('./data/cards.json');
  cards = await res.json();
  showCard();
}

function showCard() {
  flipped = false;
  const card = cards[currentIndex];
  document.getElementById('question').innerText = card.question;
  document.getElementById('answer').innerText = card.answer;
  document.getElementById('flashcard').classList.remove('flipped');
}

document.getElementById('flashcard').addEventListener('click', () => {
  flipped = !flipped;
  document.getElementById('flashcard').classList.toggle('flipped');
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showCard();
});

loadCards();
