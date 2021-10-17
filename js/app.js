/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
// let draggable;
let turnOrder = 1;
let boardGrid = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];


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

  for (i = 1; i <= 6; i++) {
    if (!squares[x - i].classList.contains("taken")) {
      squares[x - i].classList.add(tokenTurn());
      squares[x - i].classList.add("taken");
      useTokens();
      turnOrder = turnOrder * -1;
      break;
    }
  }
}

function tokenTurn(){
  if (turnOrder === 1) {
    return "drop-token1";
  } else {
    return "drop-token2";
  }
};

function findBottomSq (element){
  if (parseInt(element.id) > 0 && parseInt(element.id) < 7) {
    return 6;
  }
  if (parseInt(element.id) > 6 && parseInt(element.id) < 13) {
    return 12;
  }
  if (parseInt(element.id) > 12 && parseInt(element.id) < 19) {
    return 18;
  }
  if (parseInt(element.id) > 18 && parseInt(element.id) < 25) {
    return 24;
  }
  if (parseInt(element.id) > 24 && parseInt(element.id) < 31) {
    return 30;
  }
  if (parseInt(element.id) > 30 && parseInt(element.id) < 37) {
    return 36;
  }
  if (parseInt(element.id) > 36 && parseInt(element.id) < 43) {
    return 42;
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
        console.log(pTwoTokens[i])
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
