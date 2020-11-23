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
// // https://www.techiedelight.com/copy-elements-array-into-another-array-javascript/
// // update current points in dom
// // function for cards flipping back (set interval 1500)
// // 
// // if all cards flipped clock stops game over modal of pts appears

// /* ======================
// DOM NOTES
// =======================*/
const startButton = document.querySelector('.start')
const firstModal = document.querySelector('.modal')
const gameBoard = document.getElementById('gameboard')
const continueButton = document.querySelector('.continue')
const playButton = document.getElementById('play')
const resetButton = document.getElementById('reset')
const points = document.querySelector('.points')
const nextLevelModal = document.querySelector('.nextLevelModal')

//const container = document.querySelector('.container')

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
let count = 0
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
FUNCTIONS
=======================*/
//console.log(fullAnimalArray)
const toggleFirstModal = () => {
    firstModal.classList.toggle('open');
};
//Double the array (for matches) then shuffle    
let fullArray = animalArray.concat(animalArray);
const shuffle = () => {
    let i = fullArray.length, k , temp;
    while(--i > 0){
        k = Math.floor(Math.random() * (i+1));
        temp = fullArray[k];
        fullArray[k] = fullArray[i]
        fullArray[i] = temp;
    }
}
//create grid for game board
const openGrid = () => {
    firstModal.remove();
    shuffle();
    createGrid();

}    

const createGrid = () => {
    let grid = document.createElement('div')
    grid.setAttribute('class', 'grid');
    gameBoard.innerHTML = "";
    fullArray.forEach((item, index) => {
        let name = item.name;
        let backImg = item.backImg;
        let frontImg = item.frontImg;
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', index)
        card.dataset.name = name;
        
        let back = document.createElement('div')
        back.classList.add('back')
        back.style.backgroundImage = `url(${item.frontImg})`;
    
        let front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = `url(${item.backImg})`;
        
        
        card.appendChild(front);
        card.appendChild(back);
        grid.appendChild(card);
        
    });
    
    gameBoard.appendChild(grid);
        
    const cards = document.querySelectorAll('.card');

    class Player {
        constructor (points){
            this.points = points;
        }
        updatePoints(){
            points.innerHTML = `
            <div class='points'> 
            Points: <span>${this.points}</span>
            </div>`
        }
        addPoints(){
            this.points= +10;
            this.updatePoints();
        }
    
    }
    const player1 = new Player()
    function flip(evt) {
        this.classList.toggle('flip');
        //console.log(evt.target.parentElement.getAttribute('data-name'))
    }
    //adds event listener to all cards
    cards.forEach(card => card.addEventListener('click', flip))
    
    let flippedCards = [];
    //let matchedCards = document.getElementsByClassName("isMatch")
    let flippedCardsIds = [];
    let matchedCards = [];
    //pushes flipped cards into two arrays them decides if it is match or not
    const click = (event) => {
        flippedCards.push(event.target.parentElement.getAttribute('data-name'))
        flippedCardsIds.push(event.target.parentElement.getAttribute('id'))
        console.log(flippedCards)
        console.log(flippedCardsIds)

        if (flippedCards.length === 2){
            if(flippedCards[0] === flippedCards[1]) {
                isMatch();
            } else {
                isNotMatch()
            }
        }
    }
    
    const isMatch = () => {
        console.log('Match!')
        //give matched cards a class of isMatch
        document.getElementById(flippedCardsIds[0]).classList.add('isMatch')
        document.getElementById(flippedCardsIds[1]).classList.add('isMatch')
        console.log(matchedCards)
        //push isMatch cards into an array matchedCards
        for (let i of flippedCardsIds) {
            matchedCards.push(i);
        }
        //clear flipped arrays to start matching again
        flippedCards = [];
        flippedCardsIds=[]; 
        //add 10 points per match
        player1.addPoints(); 
        // for (let i = 1; i<=6; i++) {
        //     player1.addPoints();
        // }     
    }
       
    const isNotMatch = () => {
        setTimeout(() => {
        document.getElementById(flippedCardsIds[0]).classList.toggle('flip')
        document.getElementById(flippedCardsIds[1]).classList.toggle('flip')
        console.log('No Match!')
        flippedCards = [];
        flippedCardsIds=[]  
        }, 1000);
    }
    
    const toggleNextLevel = () => {
        nextLevelModal.classList.toggle('.open')
    }
    
    if(matchedCards === 12) {
        toggleNextLevel();
    } 

    cards.forEach(card => card.addEventListener('click', click))
}

// //stopwatch ---- fully functional it just doesnt serve a purpose yet ----
// //if seconds/minutes is only 1 dig add 0 before value
// function stopWatch(){
//     seconds++;
//     //logic to determine when to increment next value
//     if(seconds / 60 ===1){
//         seconds=0;
//         minutes++
//     }
//     if(seconds < 10){
//         displaySeconds = '0' + seconds.toString();
//     }else{
//         displaySeconds = seconds;
//     }
//     if(minutes < 10){
//         displayMinutes = '0' + minutes.toString();
//     } else { 
//         displayMinutes = minutes;
//     }
//     // display updated time
//     document.getElementById('stopwatch').innerHTML = displayMinutes + ':' + displaySeconds;

// }

// function play(){
//     if(status === false){
//         interval = window.setInterval(stopWatch, 1000)
//         status = true
//     } else {
//         window.clearInterval(interval);
//         status = false
//     }
// }

/* ======================
EVENT LISTENERS
=======================*/
startButton.addEventListener('click', toggleFirstModal);
continueButton.addEventListener('click', openGrid);
//playButton.addEventListener('click', play)
resetButton.addEventListener('click', openGrid)
// continueButton.addEventListener('click', toggleContainer)
