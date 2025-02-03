export default class Gameboard {
  board = [];
  ships = [];
  #size;

  constructor(size = 10) {
    this.#size = size;
    
    for (let i = 0; i < size; i++) {
      this.board.push( new Array(size) );
    }
  }

  get size() {
    return this.#size;
  }

  placeShip(ship, direction, target) {
    const [x,y] = target;

    const cellsOccupied = () => {
      const arr = [];

      if (direction === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          arr.push( [x, (y + i)] );
        }
      } else if (direction === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          arr.push( [(x + i), y] );
        }
      }

      return arr;
    }

    if ( this.#isOutOfBoard( cellsOccupied() ) ) {
      return 'fail';
    } else if ( this.#isOverlapping( cellsOccupied() ) ) {
      return 'fail';
    } else if ( this.#isAdjacent( cellsOccupied(), direction ) ) {
      return 'fail';
    }

    this.ships.push(ship);

    for (let cell of cellsOccupied()) {
      const [x,y] = cell;
      this.board[x][y] = ship;
    }

    return 'success';
  }

  #isOutOfBoard(cellsOccupied) {
    return cellsOccupied.some((cell) => {
      return (
        (cell[0] < 0 || cell[0] > (this.#size - 1))
        || (cell[1] < 0 || cell[1] > (this.#size - 1))
      )
    })
  }

  #isOverlapping(cellsOccupied) {
    for (let cell of cellsOccupied) {
      const [x,y] = cell;
      if (this.board[x][y]) return true;
    }

    return false;
  }

  #isAdjacent(cellsOccupied, direction) {
    const adjacentCells = () => {
      const arr = [];

      if (direction === 'horizontal') {
        for (let cell of cellsOccupied) {
          const [x,y] = cell;
          arr.push([x - 1, y]);
          arr.push([x + 1, y]);

          if (cellsOccupied.indexOf(cell) === 0) {
            arr.push([x, y - 1]);
            arr.push([x - 1, y - 1]);
            arr.push([x + 1, y - 1]);
          } else if (cellsOccupied.indexOf(cell) === (cellsOccupied.length - 1)) {
            arr.push([x, y + 1]);
            arr.push([x - 1, y + 1]);
            arr.push([x + 1, y + 1]);
          }
        }
      } else {
        for (let cell of cellsOccupied) {
          const [x,y] = cell;
          arr.push([x, y - 1]);
          arr.push([x, y + 1]);

          if (cellsOccupied.indexOf(cell) === 0) {
            arr.push([x - 1, y]);
            arr.push([x - 1, y - 1]);
            arr.push([x - 1, y + 1]);
          } else if (cellsOccupied.indexOf(cell) === (cellsOccupied.length - 1)) {
            arr.push([x + 1, y]);
            arr.push([x + 1, y - 1]);
            arr.push([x + 1, y + 1]);
          }
        }
      }

      return arr;
    }

    const filteredAdjacentCells = adjacentCells().filter((cell) => {
      return (
        ( (cell[0] >= 0) && (cell[0] < this.#size) )
        && ( (cell[1] >= 0) && (cell[1] < this.#size) )
      );
    })

    for (let cell of filteredAdjacentCells) {
      const [x,y] = cell;
      if (this.board[x][y]) return true;
    }

    return false;
  }

  receiveAttack(target) {
    const [x,y] = target;

    if (this.board[x][y] && typeof this.board[x][y].hit === 'function') {
      this.board[x][y].hit();
      this.board[x][y] = 'hit';
    } else {
      this.board[x][y] = 'miss';
    }
  }

  allSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  get emptyCells() {
    const emptyCells = [];

    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        if (this.board[i][j] === undefined) {
          emptyCells.push([i,j]);
        }
      }
    }

    return emptyCells;
  }

  get validAttackTargets() {
    const validTargets = [];

    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        if ((this.board[i][j] !== 'hit') && (this.board[i][j] !== 'miss')) {
          validTargets.push([i,j]);
        }
      }
    }

    return validTargets;
  }

  placeShipsRandomly(ships) {
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        this.board[i][j] = undefined;
      }
    }
    for (let ship of ships) {
      let foundValidPlacement = false;
      const availableCells = this.emptyCells.slice();
      
      while (!foundValidPlacement) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const randomCell = availableCells[randomIndex];
        const direction = (Math.floor(Math.random() * 2) === 0) ? 'horizontal' : 'vertical';

        if (this.placeShip(ship, direction, randomCell) === 'fail') {
          availableCells.splice(randomIndex, 1);
        } else {
          foundValidPlacement = true;
        }
      }
    }
  }
}