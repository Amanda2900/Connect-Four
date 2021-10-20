/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  // verticals
  [5, 4, 3, 2],
  [4, 3, 2, 1],
  [3, 2, 1, 0],
  [11, 10, 9, 8],
  [10, 9, 8, 7],
  [9, 8, 7, 6],
  [17, 16, 15, 14],
  [16, 15, 14, 13],
  [15, 14, 13, 12],
  [23, 22, 21, 20],
  [22, 21, 20, 19],
  [21, 20, 19, 18],
  [29, 28, 27, 26],
  [28, 27, 26, 25],
  [27, 26, 25, 24],
  [35, 34, 33, 32],
  [34, 33, 32, 31],
  [33, 32, 31, 30],
  [41, 40, 39, 38],
  [40, 39, 38, 37],
  [39, 38, 37, 36],
  // horizontals
  [5, 11, 17, 23],
  [11, 17, 23, 29],
  [17, 23, 29, 35],
  [23, 29, 35, 41],
  [4, 10, 16, 22],
  [10, 16, 22, 28],
  [16, 22, 28, 34],
  [22, 28, 34, 40],
  [3, 9, 15, 21],
  [9, 15, 21, 27],
  [15, 21, 27, 33],
  [21, 27, 33, 39],
  [2, 8, 14, 20], 
  [8, 14, 20, 26],
  [14, 20, 26, 32],
  [20, 26, 32, 38],
  [1, 7, 13, 19],
  [7, 13, 19, 25],
  [13, 19, 25, 31],
  [19, 25, 31, 37],
  [0, 6, 12, 18],
  [6, 12, 18, 24],
  [12, 18, 24, 30],
  [18, 24, 30, 36],
  // Diagonals top left to bottom right
  [2, 9, 16, 23],
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  [18, 25, 32, 39],
  // Diagonals top right to bottom left
  [23, 28, 33, 38],
  [17, 22, 27, 32],
  [22, 27, 32, 37],
  [11, 16, 21, 26],
  [16, 21, 26, 31],
  [21, 26, 31, 36],
  [5, 10, 15, 20],
  [10, 15, 20, 25],
  [15, 20, 25, 30],
  [4, 9, 14, 19],
  [9, 14, 19, 24],
  [3, 8, 13, 18]
]

/*-------------------------------- Variables --------------------------------*/
// let draggable;
let turnOrder = 1;
let boardGrid =[
  null, null, null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
];
let winner = null;


/*------------------------ Cached Element References ------------------------*/
const mainBtn = document.querySelector("#main-button");
const message = document.querySelector("#message");
const lightBtn = document.querySelector("#light");
const darkBtn = document.querySelector("#dark");
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".sq");
const pOneTokens = document.querySelectorAll(".tkn1");
const pTwoTokens = document.querySelectorAll(".tkn2");
const replayBtn = document.querySelector("#replay");
const p1 = document.querySelector(".player-one");
const p2 = document.querySelector(".player-two");
const body = document.querySelector("body");
const hudImg = document.querySelector(".main-message");
const gameTitle = document.querySelector("#game-title");
const p1Turn = document.querySelector(".p1Light");
const p2Turn = document.querySelector(".p2Light");
const instructions = document.querySelector("#instructions");
const click = new Audio("../audio/click.mp3");
const laser = new Audio("../audio/laser.mp3");

/*----------------------------- Event Listeners -----------------------------*/

mainBtn.addEventListener("click", modePage);
lightBtn.addEventListener("click", lightPage);
darkBtn.addEventListener("click", darkPage);
board.addEventListener("click", placeToken);
replayBtn.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/
init();

function init(evt) {
  speak("Welcome");
  message.innerText = "Welcome";
  replayBtn.setAttribute("hidden", true);
  mainBtn.removeAttribute("hidden");
  turnOrder = 1;
  winner = null;
  boardGrid =[
    null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
  ];
  squares.forEach(element => element.classList.remove("drop-token1", "drop-token2", "taken"));
  pOneTokens.forEach(element => element.classList.remove("used"));
  pTwoTokens.forEach(element => element.classList.remove("used"));
  board.setAttribute("hidden", true);
  p1.setAttribute("hidden", true);
  p2.setAttribute("hidden", true);
  body.classList.remove("dark");
  board.classList.remove("dark");
  p2Turn.classList.remove("turn");
  p1Turn.classList.add("turn");
};

function modePage(event) {
  speak("Choose mode");
  mainBtn.setAttribute("hidden", true);
  lightBtn.removeAttribute("hidden");
  darkBtn.removeAttribute("hidden");
  message.innerText = "Choose mode";
};

function lightPage(event) {
  body.classList.remove("dark");
  board.classList.remove("dark");
  startGame();
};

function darkPage(event) {
  darkMode();
  startGame();
};

function startGame() {
  speak("Let's play");
  lightBtn.setAttribute("hidden", true);
  darkBtn.setAttribute("hidden", true);
  hudImg.setAttribute("hidden", true);
  board.removeAttribute("hidden");
  p1.removeAttribute("hidden");
  p2.removeAttribute("hidden");
  gameTitle.removeAttribute("hidden");
  instructions.removeAttribute("hidden");
};

function render() {
  // declare end of the game based on winner value
  // reveal replay button
  if (winner !== null) {
    if (winner === 1) {
      message.innerText = 'Player 1 wins!';
      laser.volume = .20;
      laser.play();
      speak("Player one wins");
      winPage();
    } else if( winner === -1) {
      message.innerText = 'Player 2 wins!';
      laser.volume = .20;
      laser.play();
      speak("Player two wins");
      winPage();
    } else {
      message.innerText = 'Tie game!';
      laser.volume = .20;
      laser.play();
      speak("Tie game");
      winPage();
    }
  }
};

function placeToken(event) {
  click.volume = .10;
  click.play();
  
  let x = findBottomSq(event.target);
  let i = 0;

  if (!squares[x].classList.contains("taken")) {
    squares[x].classList.add(tokenTurn());
    squares[x].classList.add("taken");
    useTokens();
    boardGrid[x] = turnOrder;
    turnOrder = turnOrder * -1;
    turnIndicator();
    getWinner();
    render();
  } else {
      do {
        i += 1
      } while (squares[x - i].classList.contains("taken"))

      squares[x - i].classList.add(tokenTurn());
      squares[x - i].classList.add("taken");
      useTokens();
      boardGrid[x - i] = turnOrder;
      turnOrder = turnOrder * -1;
      turnIndicator();
      getWinner();
      render();
  }
};

function getWinner () {
  winningCombos.forEach(function (array) {
    let counter = 0;
    array.forEach(function (element) {
      counter += boardGrid[element];
      // if the amount of 1 or -1 is equal to 3, set winner to the 
      // value of winning element in boardSquare
      if (Math.abs(counter) === 4) {
        winner = boardGrid[element];
        // if the board is full and no winner has been declared, change winner to T
      } else if (boardGrid.includes(null) === false && winner === null) {
        winner = 'T';
      }else {
        return null;
      }
    })
  }) 
};

function tokenTurn(){
  if (turnOrder === 1) {
    return "drop-token1";
  } else {
    return "drop-token2";
  }
};

function findBottomSq (element){
  if (parseInt(element.id) > -1 && parseInt(element.id) < 6) {
    return 5;
  }
  if (parseInt(element.id) > 5 && parseInt(element.id) < 12) {
    return 11;
  }
  if (parseInt(element.id) > 11 && parseInt(element.id) < 18) {
    return 17;
  }
  if (parseInt(element.id) > 17 && parseInt(element.id) < 24) {
    return 23;
  }
  if (parseInt(element.id) > 23 && parseInt(element.id) < 30) {
    return 29;
  }
  if (parseInt(element.id) > 29 && parseInt(element.id) < 36) {
    return 35;
  }
  if (parseInt(element.id) > 35 && parseInt(element.id) < 42) {
    return 41;
  }
};

function useTokens() {
  for (i = 0; i <= pTwoTokens.length; i++) {
    if (turnOrder === 1) {
      if (!pOneTokens[i].classList.contains("used")) {
        pOneTokens[i].classList.add("used");
          break;
      } else {
      }
    } else {
      if (!pTwoTokens[i].classList.contains("used")) {
        pTwoTokens[i].classList.add("used");
        break;
      } else {
      }
    }
  }
};

function winPage() {
  hudImg.removeAttribute("hidden");
  replayBtn.removeAttribute("hidden");
  board.setAttribute("hidden", true);
  p1.setAttribute("hidden", true);
  p2.setAttribute("hidden", true);
  message.removeAttribute("hidden");
  gameTitle.setAttribute("hidden", true);
  instructions.setAttribute("hidden", true);
};

function turnIndicator() {
  if (turnOrder === 1) {
    p2Turn.classList.remove("turn");
    p1Turn.classList.add("turn");
  } else {
    p1Turn.classList.remove("turn");
    p2Turn.classList.add("turn");
  }
};

function darkMode() {
  body.classList.add("dark");
  board.classList.add("dark");
};

function speak(text) {
  let sp = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(sp);
};
