import Player from './player';
import Ship from './ship';
import { DOM } from './dom';

const pOneShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
const pTwoShips = [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
const randomizeButton = document.querySelector('#randomize');
const startButton = document.querySelector('#start-game');
let player1;
let player2;
const playerOneBoard = document.querySelector('#player1');
const playerTwoBoard = document.querySelector('#player2');


document.addEventListener('DOMContentLoaded', createNewGame);
randomizeButton.addEventListener('click', () => {
  player1.gameboard.placeShipsRandomly(pOneShips);
  DOM.renderFirstBoard(player1, playerOneBoard);
});
startButton.addEventListener('click', () => {
  randomizeButton.style.display = 'none';
  document.querySelector('#game-config').style.display = 'none';
  startGame();
})

function createNewGame() {
  player1 = new Player("real");
  player2 = new Player("computer");

  player1.gameboard.placeShipsRandomly(pOneShips);
  player2.gameboard.placeShipsRandomly(pTwoShips);

  DOM.renderFirstBoard(player1, playerOneBoard);
  DOM.renderSecondBoard(player2, playerTwoBoard);
}

function startGame() {
  playerTwoBoard.addEventListener('click', (e) => {
    if (e.target.classList.contains("cell")) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;

      if ((player2.gameboard.board[x][y] === 'hit') || (player2.gameboard.board[x][y] === 'miss')) return;

      player2.gameboard.receiveAttack([x,y]);
      DOM.renderSecondBoard(player2, playerTwoBoard);

      if (player2.gameboard.allSunk()) {
        alert('game over -> you win!');
        return;
      }

      attackPlayerOne();

      if (player1.gameboard.allSunk()) {
        alert('game over -> you lose!');
        return;
      }
    }
  })
}

function attackPlayerOne() {
  const validTargets = player1.gameboard.validAttackTargets;
  const randomIndex = Math.floor(Math.random() * validTargets.length);
  const randomTarget = validTargets[randomIndex];

  player1.gameboard.receiveAttack(randomTarget);
  DOM.renderFirstBoard(player1, playerOneBoard);
}