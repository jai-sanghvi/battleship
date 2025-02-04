import Player from './player';
import Ship from './ship';
import { DOM } from './dom';

const randomizeButton = document.querySelector('#randomize');
const startButton = document.querySelector('#start-game');
const gameConfig = document.querySelector('#game-config');
const gameStatus = document.querySelector('#game-status');
let player1;
let player2;
const playerOneBoard = document.querySelector('#player1');
const playerTwoBoard = document.querySelector('#player2');


document.addEventListener('DOMContentLoaded', createNewGame);
randomizeButton.addEventListener('click', () => {
  const ships = player1.gameboard.ships;
  player1.gameboard.ships = [];
  player1.gameboard.placeShipsRandomly(ships);
  DOM.renderFirstBoard(player1, playerOneBoard);
});
startButton.addEventListener('click', () => {
  randomizeButton.style.display = 'none';
  gameConfig.style.display = 'none';
  startGame();
})

function createNewGame() {
  const pOneShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  const pTwoShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];

  player1 = new Player("real");
  player2 = new Player("computer");

  player1.gameboard.placeShipsRandomly(pOneShips);
  player2.gameboard.placeShipsRandomly(pTwoShips);

  DOM.renderFirstBoard(player1, playerOneBoard);
  DOM.renderSecondBoard(player2, playerTwoBoard);
}

function startGame() {
  playerTwoBoard.addEventListener('click', playRound);
}

function playRound(e) {
  if (e.target.classList.contains("cell")) {
    const x = e.target.dataset.x;
    const y = e.target.dataset.y;

    if ((player2.gameboard.board[x][y] === 'hit') || (player2.gameboard.board[x][y] === 'miss')) return;

    player2.gameboard.receiveAttack([x,y]);
    DOM.renderSecondBoard(player2, playerTwoBoard);

    if (player2.gameboard.allSunk()) {
      gameStatus.textContent = "GAME OVER - YOU WIN!";
      gameConfig.style.display = 'grid';
      randomizeButton.style.display = 'inline-block';
      createNewGame();
      startButton.textContent = "Play again";
      return;
    }

    attackPlayerOne();

    if (player1.gameboard.allSunk()) {
      gameStatus.textContent = "GAME OVER - YOU LOSE!";
      gameConfig.style.display = 'grid';
      randomizeButton.style.display = 'inline-block';
      createNewGame();
      startButton.textContent = "Play again";
      return;
    }
  }
}

function attackPlayerOne() {
  const validTargets = player1.gameboard.validAttackTargets;
  const randomIndex = Math.floor(Math.random() * validTargets.length);
  const randomTarget = validTargets[randomIndex];

  player1.gameboard.receiveAttack(randomTarget);
  DOM.renderFirstBoard(player1, playerOneBoard);
}