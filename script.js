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
const firstModal = document.querySelector('.modal')
const gameBoard = document.getElementById('gameboard')
const continueButton = document.querySelector('.continue')
const playButton = document.getElementById('play')
const resetButton = document.getElementById('reset')

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
FUNCTIONS
=======================*/
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
 //console.log(fullAnimalArray)
const toggleFirstModal = () => {
    firstModal.classList.toggle('open');
};
//create grid for game board


// const toggleContainer = () => {
//     container.classList.toggle('open');
// };

const openGrid = () => {
    firstModal.remove();
    shuffle();
    createGrid();
    // toggleContainer();
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
        // card.setAttribute('id', index)
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

    function flip(evt) {
        this.classList.add('flip');
        //console.log(evt.target.parentElement.getAttribute('data-name'))
    }
    //adds event listener to all cards
    cards.forEach(card => card.addEventListener('click', flip))
    // if class = card.flip?
    // less then 2 elements in the array add 1 element then flip 2nd card check to see if they have same data-name if dont math empty array 
    // if there is check to see if that has the same data name
    // use getattribute for data name
    // same data name = match
    // store both (array etc)
    // remove class flip 
    //  add class match
    
    let flippedCards = [];
    //let matchedCards = document.getElementsByClassName("isMatch")
   
    const click = (event) => {
        flippedCards.push(event.target.parentElement.getAttribute('data-name'))
        console.log(flippedCards)
        if (flippedCards.length === 2){
            if(flippedCards[0] === flippedCards[1]) {
                console.log(flippedCards)
                isMatch();
            } else {
                isNotMatch()
            }
        }
    }

    const isMatch = () => {
        card.classList.add('isMatch')
        console.log('Match!')
        flippedCards = [];
        //changes class to isMatch, 
        
        // function addIsMatch(event) {
        //     let addClassIsMatch = querySelector('.card')
        //     addClassIsMatch.classList.add('isMatch')
        // }
        //add 10
         

        //add to completed array,
        console.log('its a match!')

    }

    const isNotMatch = () => {
        document.getElementsByClassName('card').removeClassName('flip')
        console.log('No Match!')
        flippedCards = [];
       
    }


    // const match = (event) => {
    //     matchedCards.push(event.target.getAttribute('.isMatch'))
    //     if (matchedCards[] >= 12) {
    //     add points
    //     
    //         //toggleCongratsModal();
    //         console.log('you win!!')
    //     }
    // }
    
 

    cards.forEach(card => card.addEventListener('click', click))
}

// function click(){
//     let length = openCards.length;
//     if (length === 2) {
//         if (openCards[0].getAttribute('data-name') === openCards[1].getAttribute('data-name')) {
//             isMatch();
//         } else {
//             isNotMatch();
//         }
//     }
// }
// function isMatch () {

// }




//score
// let score = 0
//



// function begin game 
// call function to keep game going














//stopwatch
// if seconds/minutes is only 1 dig add 0 before value
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
resetButton.addEventListener('click', openGrid)
// continueButton.addEventListener('click', toggleContainer)
