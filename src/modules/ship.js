export default class Ship {
  #hits = 0;
  #length;
  #direction;

  constructor(length, direction) {
    this.#length = length;
    this.#direction = direction;
  }

  get hits() {
    return this.#hits;
  }

  get length() {
    return this.#length;
  }

  get direction() {
    return this.#direction;
  }

  hit() {
    if ( !this.isSunk() ) {
      this.#hits++;
    }
  }

  isSunk() {
    return (this.#hits === this.#length);
  }
}