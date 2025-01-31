import {beforeEach, describe, expect, test} from '@jest/globals'

import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
})

describe('placeShip()', () => {
  test('places ship at specified location on the board', () => {
    const ship = new Ship(2);

    expect(gameboard.board[1][1]).toBeUndefined();
    gameboard.placeShip(ship, "horizontal", [1,1]);
    expect(gameboard.board[1][1] instanceof Ship).toBe(true);
  })

  test('places ship horizontally', () => {
    const ship = new Ship(2);

    gameboard.placeShip(ship, "horizontal", [1,1]);
    expect(gameboard.board[1][1] instanceof Ship).toBe(true);
    expect(gameboard.board[1][2] instanceof Ship).toBe(true);
  })

  test('places ship vertically', () => {
    const ship = new Ship(2);

    gameboard.placeShip(ship, "vertical", [1,1]);
    expect(gameboard.board[1][1] instanceof Ship).toBe(true);
    expect(gameboard.board[2][1] instanceof Ship).toBe(true);
  })
})

describe('receiveAttack()', () => {
  test('increases hits of target ship if target is a ship', () => {
    const ship = new Ship(2);

    gameboard.placeShip(ship, 'horizontal', [1,5]);
    gameboard.receiveAttack([1,5]);
    expect(gameboard.board[1][5] instanceof Ship).toBe(true);
    expect(gameboard.board[1][5].hits).toBe(1);
  })

  test('records missed shots', () => {
    gameboard.receiveAttack([1,5]);
    expect(gameboard.board[1][5]).toBe('miss');
  })
})

describe('allSunk()', () => {
  test('returns true if all ships have sunk', () => {
    const ships = [new Ship(3), new Ship(2)];

    gameboard.placeShip(ships[0], 'horizontal', [2,6]);
    gameboard.placeShip(ships[1], 'horizontal', [1,2]);
    
    gameboard.receiveAttack([2,6]);
    gameboard.receiveAttack([2,7]);
    gameboard.receiveAttack([2,8]);
    gameboard.receiveAttack([1,2]);
    gameboard.receiveAttack([1,3]);

    expect(gameboard.allSunk()).toBe(true);
  })

  test('returns false if not all ships have sunk', () => {
    const ships = [new Ship(3), new Ship(2)];

    gameboard.placeShip(ships[0], 'horizontal', [2,6]);
    gameboard.placeShip(ships[1], 'horizontal', [1,2]);

    gameboard.receiveAttack([2,6]);
    gameboard.receiveAttack([2,7]);
    gameboard.receiveAttack([1,2]);

    expect(gameboard.allSunk()).toBe(false);
  })
})