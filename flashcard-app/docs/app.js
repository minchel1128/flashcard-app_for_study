let cards = [];
let currentIndex = 0;
let showingQuestion = true;
let autoInterval = null;

fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    cards = shuffleArray(data);
    currentIndex = 0;
    displayCard();
  });

function displayCard() {
  const card = cards[currentIndex];
  const flashcard = document.getElementById('flashcard');
  flashcard.textContent = showingQuestion ? card.question : card.answer;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

document.getElementById('flashcard').addEventListener('click', () => {
  showingQuestion = !showingQuestion;
  displayCard();
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  showingQuestion = true;
  displayCard();
});

document.getElementById('autoToggle').addEventListener('change', (e) => {
  if (e.target.checked) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
});

document.getElementById('intervalSelect').addEventListener('change', () => {
  if (document.getElementById('autoToggle').checked) {
    startAutoSlide();
  }
});

function startAutoSlide() {
  stopAutoSlide();
  const interval = parseInt(document.getElementById('intervalSelect').value, 10);
  autoInterval = setInterval(() => {
    document.getElementById('next').click();
  }, interval);
}

function stopAutoSlide() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}
