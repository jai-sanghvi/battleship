export default class Ship {
  #hits = 0;
  #length;

  constructor(length) {
    this.#length = length;
  }

  get hits() {
    return this.#hits;
  }

  get length() {
    return this.#length;
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