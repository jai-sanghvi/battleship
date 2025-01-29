import {beforeEach, describe, expect, test} from '@jest/globals'

import Ship from "../modules/ship";
let ship;
beforeEach(() => {
  ship = new Ship(3);
})

describe('hit()', () => {
  test('increments the number of hits by 1', () => {
    expect(ship.hits).toBe(0);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
  })

  test('stops incrementing once ship is sunk', () => {
    expect(ship.hits).toBe(0);
    ship.hit();
    expect(ship.hits).toBe(1);
    ship.hit();
    expect(ship.hits).toBe(2);
    ship.hit();
    expect(ship.hits).toBe(3);
    ship.hit();
    expect(ship.hits).toBe(3);
    ship.hit();
  })
})

describe('isSunk()', () => {
  test('returns true if hits is equal to length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  })

  test('returns false if hits is less than length', () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  })
})