//generate random
var wordH2 = document.querySelector("#word-spot");
var wordArray = ["seattle","houston","newyork","corolado","losangles"];
var guessedLetter;
var startBtn = document.querySelector("#start");
var randomWord;
var countdownTimer;
var timeLeft = 10;
var isPlaying = false;
var winSpan = document.querySelector("#win-span");
var loseSpan = document.querySelector("#lose-span");
var resetBtn = document.querySelector("#reset");
var timeLeftSpan = document.querySelector("#time-left");
var resultH2 = document.querySelector("#result");
var win = 0;
var lose = 0;
winSpan.textContent = win;
loseSpan.textContent = lose;
resultH2.style.display ="none";
var win = localStorage.getItem("win") || 0;
var lose = localStorage.getItem("lose") || 0;


function startGame(){
    if(isPlaying){
        return;
    }
    resultH2.style.display ="none";
    timeLeft = 10;
    isPlaying = true;
    countdownTimer = setInterval(function(){
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        console.log(`${timeLeft} seconds left`);
        if (timeLeft == 0){
            clearInterval(countdownTimer);
            lose++;
            localStorage.setItem("lose",lose);
            resultH2.style.display ="block";
            resultH2.textContent = "You lose";
            loseSpan.textContent = lose;
            
            isPlaying = false; 
        }
    },1000)
// get 1 index from array will become a string. Can use index[i] to get item inside the sting
    randomWord = wordArray[Math.floor(Math.random()*wordArray.length)];
    guessedLetter =[];
    for( let i = 0; i < randomWord.length; i++){
        guessedLetter.push("_");
        //show , on the screen because we try to convert array to the string and by default comp try to separate the string
        wordH2.textContent = guessedLetter.join("  ");
    }
    console.log(randomWord);
    console.log(guessedLetter);
}
document.addEventListener("keyup",function(event){
    if(!isPlaying){
        return;
    }
    console.log(event.key);
    if(randomWord.includes(event.key)){
        for( let i = 0; i < randomWord.length; i++){
            if(randomWord[i] === event.key){
                guessedLetter[i] = event.key;
            }
        }
        
        wordH2.textContent = guessedLetter.join("  ");
    }  
    if(guessedLetter.join("") === randomWord){
        win++;
        localStorage.setItem("win",win);
        winSpan.textContent = win;
        resultH2.style.display ="block";
        resultH2.textContent = "You win";
        clearInterval(countdownTimer);
        isPlaying = false;
    }     

})

startBtn.addEventListener("click",startGame);
resetBtn.addEventListener("click",function(){
    localStorage.clear;
    win = 0;
    lose = 0;
    winSpan.textContent = win;
    loseSpan.textContent = lose;

})

