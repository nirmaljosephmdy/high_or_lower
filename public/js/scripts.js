const apiUrl = "https://higherorlower-api.netlify.app/json";
var cards = cards;
let currentCardIndex = 0;
let correctGuesses = 0;
let wrongGuesses = 0;
const maxWrongGuesses = 3;

let highScore = parseInt(sessionStorage.getItem('highScore')) || 0;
document.getElementById("totalScore").innerText = correctGuesses;
document.getElementById("remainingChances").innerText = maxWrongGuesses;


function fetchCards() {
    shuffleCards();
    displayCard();
}

function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function displayCard() {
    const cardElement = document.getElementById("card");
    if (currentCardIndex < cards.length) {
        const expr = cards[currentCardIndex].suit;
        const suits = ['♥', '♠', '♣', '♦'];
        switch (expr) {
        case 'clubs':
            var symbol = '♣';
            var card_class = "card suitclubs";
            var d = document.getElementById("card");
            d.className += card_class;
            break;
        case 'spades':
            var symbol = '♠';
            var card_class = "card suitspades";
            var d = document.getElementById("card");
            d.className += card_class;
            break;
        case 'diamonds':
            var symbol = '♦';
            var card_class = "card suitdiamonds";
            var d = document.getElementById("card");
            d.className += card_class;
            break;
        case 'hearts':
            var symbol = '♥';
            var card_class = "card suithearts";
            var d = document.getElementById("card");
            d.className += card_class;
            break;
        default:
            console.log(`Sorry, we are out of ${expr}.`);
       }
    }   

    if (currentCardIndex < cards.length) {
        const expr = cards[currentCardIndex].value;
        const suits = ['♥', '♠', '♣', '♦'];
        switch (expr) {
        case 'jack':
            var value = 'J';
            break;
        case 'king':
            var value = 'K';
            break;
        case 'queen':
            var value = 'Q';
            break;
        default:
            var value = cards[currentCardIndex].value;
       }
    }  
    
    document.getElementById("card-value").innerText = value;
    // cardElement.textContent = value + " " + symbol;
}

function guess(userChoice) {
    currentCardIndex++;
    if (currentCardIndex < cards.length) {
        
        const currentCardValue = getValue(cards[currentCardIndex - 1].value);
        const nextCardValue = getValue(cards[currentCardIndex].value);

        if ((userChoice === 'higher' && nextCardValue > currentCardValue) ||
            (userChoice === 'lower' && nextCardValue < currentCardValue)) {
            correctGuesses++;
            document.getElementById("totalScore").innerText = correctGuesses;
            displayCard();
            displayResult("Correct! Keep going.");
        } else {
            wrongGuesses++;
            document.getElementById("remainingChances").innerText = maxWrongGuesses - wrongGuesses;
            if (wrongGuesses >= maxWrongGuesses) {
                // If max wrong guesses reached, end the game
                document.getElementById("totalScore").innerText = correctGuesses;
                displayResult(`Game over. You reached the maximum wrong guesses. Total correct guesses: ${correctGuesses}`);
                showRestartButton();
                updateHighScore();
                document.getElementById("buttons-cards").style.visibility = 'hidden';
            } else {
                // Otherwise, continue with a new card
                document.getElementById("totalScore").innerText = correctGuesses;
                displayResult(`Incorrect. Wrong guesses: ${wrongGuesses}. Total correct guesses: ${correctGuesses}`);
                displayCard();
            }
        }
    } else {
        displayResult(`Congratulations! You completed the deck with ${correctGuesses} correct guesses.`);
        showRestartButton();
        updateHighScore();
    }
}

function getValue(cardValue) {
    if (cardValue === 'J') return 11;
    if (cardValue === 'Q') return 12;
    if (cardValue === 'K') return 13;
    if (cardValue === 'A') return 14;
    return parseInt(cardValue);
}

function displayResult(message) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = message;
}

function showRestartButton() {
    document.getElementById("restartBtn").style.display = "block";
}

function restartGame() {
    currentCardIndex = 0;
    correctGuesses = 0;
    document.getElementById("buttons-cards").style.display = "block";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("totalScore").innerText = '0';
    location.reload();
    
    
    displayCard();
    displayResult("");
}
function updateHighScore() {
    if (correctGuesses > highScore) {
        highScore = correctGuesses;
        sessionStorage.setItem('highScore', highScore);
    }
}
// Initialize the game
fetchCards();
