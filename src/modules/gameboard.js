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

  get emptyCells() {
    const emptyCells = [];

    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === undefined) {
          emptyCells.push([i,j]);
        }
      }
    }

    return emptyCells;
  }

  placeShipsRandomly(ships) {
    for (let ship of ships) {
      let foundValidPlacement = false;
      const availableCells = this.emptyCells.slice();
      while (!foundValidPlacement) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const randomCell = availableCells[randomIndex];
        const direction = (Math.floor(Math.random() * 2) === 0) ? 'horizontal' : 'vertical';
        foundValidPlacement = this.#isValidPlacement(ship, randomCell, direction);

        if (foundValidPlacement) {
          this.placeShip(ship, direction, randomCell);
        } else {
          availableCells.splice(randomIndex, 1);
        }
      }
    }
  }

  #isValidPlacement(ship, target, direction) {
    const cellsOccupied = [];

    for (let i = 0; i < ship.length; i++) {
      const [x,y] = target;

      if (direction === 'horizontal') {
        cellsOccupied.push( [x, (y + i)] );
      } else if (direction === 'vertical') {
        cellsOccupied.push( [(x + i), y] );
      }
    }

    const isOutOfBoard = cellsOccupied.some((cell) => {
      if (
        cell[0] < 0
        || cell[0] > (this.#size - 1)
        || cell[1] < 0
        || cell[1] > (this.#size - 1)
      ) {
        return true;
      }
    })

    if (isOutOfBoard) return false;

    const isValid = () => {
      if (direction === 'horizontal') {
        for (let i = 0; i < cellsOccupied.length; i++) {
          const [x,y] = cellsOccupied[i];

          if (i === 0) {
            if (
              this.board[x - 1][y - 1]
              || this.board[x][y - 1]
              || this.board[x + 1][y - 1]
            ) {
              return false;
            }
          } else if (i === (cellsOccupied.length - 1)) {
            if (
              this.board[x - 1][y + 1]
              || this.board[x][y + 1]
              || this.board[x + 1][y + 1]
            ) {
              return false;
            }
          }
          
          if (
            this.board[x][y]
            || this.board[x - 1][y]
            || this.board[x + 1][y]
          ) {
            return false;
          }
        }

        return true;
      } else if (direction === 'vertical') {
        for (let i = 0; i < cellsOccupied.length; i++) {
          const [x,y] = cellsOccupied[i];

          if (i === 0) {
            if (
              this.board[x - 1][y - 1]
              || this.board[x - 1][y]
              || this.board[x - 1][y + 1]
            ) {
              return false;
            }
          } else if (i === (cellsOccupied.length - 1)) {
            if (
              this.board[x + 1][y - 1]
              || this.board[x + 1][y]
              || this.board[x + 1][y + 1]
            ) {
              return false;
            }
          }
          
          if (
            this.board[x][y]
            || this.board[x][y - 1]
            || this.board[x][y + 1]
          ) {
            return false;
          }
        }
        
        return true;
      }
    }

    return isValid;
  }
}