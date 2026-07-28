let emoji = ["🍎","🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉", "🍓", "🍓", "🍒", "🍒", "🥝", "🥝", "🍍", "🍍"];
let winner = document.getElementById("winner");
let resetButton = document.getElementById("reset");
let message = document.getElementById("message");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let container = document.querySelector(".container");

shuffleCards();
for (let i = 0; i < 16; i++) {
    let card = document.createElement("button");
    card.classList.add("card");
    container.appendChild(card);
    card.textContent = "";
    card.dataset.emoji = emoji[i];  
    
    card.addEventListener("click", handleCardClick);
}



function handleCardClick() {
    const card = this;
     if(!lockBoard){
     card.textContent = card.dataset.emoji;
     if(firstCard === null) {
        firstCard = card;
        
        

     } else{ 
        
        if(card === firstCard) return;
        secondCard = card;
       lockBoard = true;
     } 
     if(firstCard && secondCard) {
        if(firstCard.dataset.emoji === secondCard.dataset.emoji) {
            firstCard.textContent = firstCard.dataset.emoji;
            secondCard.textContent = secondCard.dataset.emoji;
            matchedPairs++;
            firstCard = null;
            secondCard = null;
            lockBoard = false;

            
        } else {
            setTimeout(() => {
                firstCard.textContent = "";
                secondCard.textContent = "";
                firstCard = null;
                secondCard = null;
                 lockBoard = false;

            }, 1000);
        }
        checkWinner();
    }}}


function checkWinner() {
    if (matchedPairs == 8) {
        lockBoard = true;
        winner.textContent = "Congratulations! You won!";
    }
}


function resetGame() {
    winner.textContent = "";
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.textContent = "";
    });
    shuffleCards();
     
     cards.forEach((card, index) => {
       card.dataset.emoji = emoji[index];
     });
    matchedPairs = 0;
    firstCard = null;
    secondCard = null; 
    lockBoard = false;


 }


function shuffleCards() {
     for (let i = emoji.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [emoji[i], emoji[j]] = [emoji[j], emoji[i]];
           
        }
        

}

resetButton.addEventListener("click", resetGame);