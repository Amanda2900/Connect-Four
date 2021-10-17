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
  [8, 14, 20, 27],
  [14, 20, 27, 32],
  [20, 27, 32, 38],
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
const squares = document.querySelectorAll(".sq")
const pOneTokens = document.querySelectorAll(".tkn1")
const pTwoTokens = document.querySelectorAll(".tkn2")
// const p1Tokens = document.querySelectorAll(".tkn1");
// const p2Tokens = document.querySelector(".p2-tokens");
// const dropZones = document.querySelectorAll(".dropzone");

/*----------------------------- Event Listeners -----------------------------*/

mainBtn.addEventListener("click", modePage);
lightBtn.addEventListener("click", lightPage);
darkBtn.addEventListener("click", darkPage);
board.addEventListener("click", placeToken);

// p1Tokens.forEach(token => {
//   addEventListener("drag", dragStart);
// });

// dropZones.forEach(zone => {
//   zone.addEventListener('dragenter', dragEnter)
//   zone.addEventListener('dragover', dragOver);
//   zone.addEventListener('dragleave', dragLeave);
//   zone.addEventListener('drop', drop);
// });

/*-------------------------------- Functions --------------------------------*/

function modePage() {
  lightBtn.removeAttribute("hidden");
  darkBtn.removeAttribute("hidden");
  mainBtn.setAttribute("hidden", true);
  message.innerText = "Choose your mode";
  mainBtn.innerText = "Ready";
}

function lightPage() {
  // active light mode
  startGame();
}

function darkPage() {
  // active dark mode
  startGame();
}

function startGame() {
  lightBtn.setAttribute("hidden", true);
  darkBtn.setAttribute("hidden", true);
  message.innerText = "Connect Four";
  turnOrder = 1;
}

function placeToken(event) {
  // hide one token based on turn order
  // check if the squares below have an occupant and move the image down if so.
  let x = findBottomSq(event.target);

  for (i = 0; i <= 5; i++) {
    if (!squares[x - i].classList.contains("taken")) {
      squares[x - i].classList.add(tokenTurn());
      squares[x - i].classList.add("taken");
      useTokens();
      console.log(boardGrid)
      turnOrder = turnOrder * -1;
      break;
    }
  }
}

function getWinner () {

}

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
}

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
}
// function dragStart(event) {
//   draggable = event.target.id;
//   event.dataTransfer.setData("text/plain", event.target.id);
//   event.dataTransfer.effectAllowed = "move";
//   event.target.setAttribute("hidden", true);
// }

// function dragEnter(event) {
//   event.preventDefault();
//   event.target.classList.add('drag-over');
// }

// function dragOver(event) {
//   event.preventDefault();
//   event.target.classList.add('drag-over');
//   event.dataTransfer.dropEffect = "move";
// }

// function dragLeave(event) {
//   event.target.classList.remove('drag-over');
// }

// function drop(event) {
//   event.target.classList.remove('drag-over');

//   event.preventDefault();
//   // get the draggable element
//   const data = event.dataTransfer.getData('text/plain');

//   console.log(document.getElementById(data))
//   // add it to the drop target
//   event.target.appendChild(document.getElementById(data));

//   // display the draggable element
//   draggable.removeAttribute("hidden");
// }
