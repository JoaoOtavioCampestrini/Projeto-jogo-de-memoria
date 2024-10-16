const cardsArray = [
    { name: 'goofy01', img: 'assets/goofy01.jpg' },
    { name: 'goofy02', img: 'assets/goofy02.jpg' },
    { name: 'goofy03', img: 'assets/goofy03.jpg' },
    { name: 'goofy04', img: 'assets/goofy04.jpg' },
    { name: 'goofy05', img: 'assets/goofy05.jpg' },
    { name: 'goofy06', img: 'assets/goofy06.jpg' },
    { name: 'goofy07', img: 'assets/goofy07.jpg' },
    { name: 'goofy08', img: 'assets/goofy08.jpg' },
    { name: 'goofy01', img: 'assets/goofy01.jpg' },
    { name: 'goofy02', img: 'assets/goofy02.jpg' },
    { name: 'goofy03', img: 'assets/goofy03.jpg' },
    { name: 'goofy04', img: 'assets/goofy04.jpg' },
    { name: 'goofy05', img: 'assets/goofy05.jpg' },
    { name: 'goofy06', img: 'assets/goofy06.jpg' },
    { name: 'goofy07', img: 'assets/goofy07.jpg' },
    { name: 'goofy08', img: 'assets/goofy08.jpg' }
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let gameStarted = false;
let timerInterval = null;
let seconds = 0;

const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('timer');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;

        const cardImg = document.createElement('img');
        cardImg.src = card.img;
        cardElement.appendChild(cardImg);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    if (!gameStarted) {
        gameStarted = true;
        startTimer();
    }

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            endGame();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds;
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Parabéns! Você completou o jogo em ${seconds} segundos.`);
}

createBoard();


