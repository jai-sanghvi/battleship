export default class Gameboard {
  board = [];
  ships = [];

  constructor(size = 10) {
    for (let i = 0; i < size; i++) {
      this.board.push( new Array(size) );
    }
  }

  placeShip(ship, direction, target) {
    const [x,y] = target;

    this.ships.push(ship);

    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
  }

  receiveAttack(target) {
    const [x,y] = target;

    if (this.board[x][y] && typeof this.board[x][y].hit === 'function') {
      this.board[x][y].hit();
    } else {
      this.board[x][y] = 'miss';
    }
  }

  allSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}