let player="x";

let errorMessage=document.getElementById("message");
let playerText=document.getElementById("player");
let cells=document.getElementsByClassName("cell");
let resetButton=document.getElementById("reset");
let winnerMessage=document.getElementById("winner");
let winner=false;
let moveCount=0;
let winState=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


for( let i=0;i<cells.length;i++){

    
    cells[i].addEventListener("click",function(){
    if(!winner && moveCount<9){ 
         if(cells[i].textContent!=="x" && cells[i].textContent!=="o"){
         errorMessage.textContent = "";
        cells[i].textContent=player;
        moveCount++;
        checkWinner();

        if(!winner){
            if(moveCount===9){
                winnerMessage.textContent="Game Over";
                winner=true;
              }
            
        else{
        changePlayer();
       } }
      
      

    } 
    else if(cells[i].textContent==="x" || cells[i].textContent==="o"){
        errorMessage.textContent=" can't change the value of this cell try another cell";
         
         
    }}})} 


 function changePlayer(){
    if(player==="x"){
        player="o"
        playerText.textContent="Player O turn"
    }
    else{
        player="x"
         playerText.textContent="Player X turn"
    }
 }

 function checkWinner(){
   for(let check of winState){
    if(cells[check[0]].textContent!==""&&cells[check[0]].textContent==cells[check[1]].textContent && cells[check[1]].textContent==cells[check[2]].textContent ){
        winner=true;
        winnerMessage.classList.add("winnertext");
        winnerMessage.textContent="Player "+cells[check[0]].textContent+" is the winner";
        highlightWinner(check);
        break;
    }
   }
};
function resetGame(){
  
resetButton.addEventListener("click",function(){
    for( let i=0;i<cells.length;i++){
        cells[i].textContent="";
        cells[i].classList.remove("winner");
    
    }
        winner = false;
        player = "x";
        playerText.textContent = "Player X turn";
        winnerMessage.textContent = "";
         winnerMessage.classList.remove("winnertext");
        errorMessage.textContent = "";
        moveCount = 0;
}
)
}
function highlightWinner(check){
    for(let index in check){
        cells[check[index]].classList.add("winner");
    }
}
 resetGame();