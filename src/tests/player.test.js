import {describe, expect, test} from '@jest/globals'

import Player from "../modules/player";
import Gameboard from '../modules/gameboard';

describe('Player class', () => {
  test('can create a real player', () => {
    const player = new Player("real");
    expect(player.type).toBe("real");
  })

  test('can create a computer player', () => {
    const player = new Player("computer");
    expect(player.type).toBe("computer");
  })

  test('creates a gameboard for each player', () => {
    const player1 = new Player("real");
    const player2 = new Player("computer");

    expect(player1.gameboard instanceof Gameboard).toBe(true);
    expect(player2.gameboard instanceof Gameboard).toBe(true);
  })
})