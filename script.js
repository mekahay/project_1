// console.log('yes, i am connected')
// /* ======================
// Psudocode
// =======================*/
// // modal appears on 'click' modal dissapear, game board appears
// // player click play, on 'click' time begins to increase 
// // https://www.youtube.com/watch?v=1INmsFnD-u4
// // https://www.w3schools.com/jsref/met_win_setinterval.asp
// // https://stackoverflow.com/questions/56659035/creating-a-simple-stopwatch-html
// // https://www.codegrepper.com/code-examples/javascript/how+to+make+a+stopwatch+using+js
// // 5 seconds - 10 points 
// // cards array []
// // https://www.taniarascia.com/how-to-create-a-memory-game-super-mario-with-plain-javascript/
// // function randomize card location
// // https://www.peachpit.com/articles/article.aspx?p=2239154&seqNum=10
// // https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
// // on 'click', flip card
// // function for flip card
// // if first card === true then remain 
// // if second card === true && check for a match === true remain face up & +15points
// // check match function 
// // match/not match logic use this (true ? stay flipped : (otherwise) flip back over) 
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
// // if match remove option to 'click' on those cards
// // update current points in dom
// // function for cards flipping back (set interval 1500)
// // 
// // if all cards flipped clock stops game over modal of pts appears

// /* ======================
// DOM NOTES
// =======================*/
const startButton = document.querySelector('.start')
const modal = document.querySelector('.modal')
const gameBoard = document.getElementById('gameboard')
const continueButton = document.querySelector('.continue')
const playButton = document.getElementById('play')
//stopwatch//
let seconds = 0;
let minutes = 0;
// define let/const to hold 'display; value
let displaySeconds = 0;
let displayMinutes= 0;

// let/const to hold setInterval function until start pushed
let setInterval=null;
// let/const to hold stopwatch status
let status = false;
// stopwatch function (logic to determine next increment)
// /* ======================
// CREATE CARDS
// =======================*/
const animalArray = [
    {
        name: 'cow',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal1.png',
    },
    {
        name: 'dog',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal2.png',
    },
    {
        name: 'bear',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal3.png',
    },
    {
        name: 'lion',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal4.png',
    },
    {
        name: 'tiger',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal5.png',
    },
    {
        name: 'bunny',
        frontImg: 'emojis/recollection.png',
        backImg: 'emojis/animal6.png',
    }
] 
/* ======================
GLOBAL VARIABLES
=======================*/
/* ======================
FUNCTIONS
=======================*/

let fullAnimalArray = animalArray.concat(animalArray);
let i = fullAnimalArray.length, k , temp;
while(--i > 0){
    k = Math.floor(Math.random() * (i+1));
    temp=fullAnimalArray[k];
    fullAnimalArray[k] = fullAnimalArray[i]
    fullAnimalArray[i] = temp;
}
 //console.log(fullAnimalArray)
const toggleFirstModal = () => {
    modal.classList.toggle('open');
};
//creategrid for game board

let grid = document.createElement('div')

const openGrid = () => {
    grid.setAttribute('class', 'grid');
    gameBoard.appendChild(grid);
    modal.remove();
}    


fullAnimalArray.forEach((item) => {
    let name = item.name;
    let img = item.backImg;
    let frontImg = item.frontImg;
    console.log(item.frontImg)
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
    
    let front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url(${item.frontImg})`;
    
    let back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`;
    
    card.appendChild(front);
    card.appendChild(back)
    grid.appendChild(card);
    
});

// for (let i = 0; i < animalArray; i++) {
//     let animal = getRandomItem(animalArray);
//     animalArray[i].innerHTML = aminal.image
// }



//randomize cards
// let randomNum = Math.floor(Math.random() * animalArray.length)

//fisher yates randomize
//let i = animalArray.length, k , temp;


//stopwatch
// if seconds/minutes is only 1 diget add 0 before value
function stopWatch(){
    seconds++;
    //logic to determine when to increment next value
    if(seconds / 60 ===1){
        seconds=0;
        minutes++
    }
    if(seconds < 10){
        displaySeconds = '0' + seconds.toString();
    }else{
        displaySeconds = seconds;
    }
    if(minutes < 10){
        displayMinutes = '0' + minutes.toString();
    } else { 
        displayMinutes = minutes;
    }
    // display updated time
    document.getElementById('stopwatch').innerHTML = displayMinutes + ':' + displaySeconds;

}

function play(){
    if(status === false){
        interval = window.setInterval(stopWatch, 1000)
        document.getElementById('play').innerHTML = 'stop';
        status = true
    } else {
        window.clearInterval(interval);
        document.getElementById('play').innerHTML = 'start'
        status = false
    }
}

/* ======================
EVENT LISTENERS
=======================*/
startButton.addEventListener('click', toggleFirstModal);
continueButton.addEventListener('click', openGrid);
playButton.addEventListener('click', play)