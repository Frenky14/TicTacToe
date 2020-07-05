const xClass = "x";
const oClass = "o";
const winnningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6],
];
const winningMsgTextElement = document.querySelector("[data-win-msg-text]");
const cellElements = document.querySelectorAll("[data-cell");
const board = document.getElementById("board");
const winningMsgElement = document.getElementById("winningMessage");
let circleTurn;

startGame();

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true }); //sam enkrat fire event za posamezn kvadrat
});

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true }); //sam enkrat fire event za posamezn kvadrat
  });
  setBoardHoverClass();
}

function handleClick(e) {
  const currentClass = circleTurn ? oClass : xClass;
  const cell = e.target;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMsgElement.innerText = "Draw!";
  } else {
    winningMsgTextElement.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  winningMsgElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);
  if (circleTurn) {
    board.classList.add(oClass);
  } else {
    board.classList.add(xClass);
  }
}

function checkWin(currentClass) {
  return winnningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
