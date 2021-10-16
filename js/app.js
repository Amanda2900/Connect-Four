/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/
const mainBtn = document.querySelector("#main-button");
const message = document.querySelector("#message");
const lightBtn = document.querySelector("#light");
const darkBtn = document.querySelector("#dark");

/*----------------------------- Event Listeners -----------------------------*/

mainBtn.addEventListener("click", modePage);
lightBtn.addEventListener("click", lightPage);
darkBtn.addEventListener("click", darkPage);

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
}