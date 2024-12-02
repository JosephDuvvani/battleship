export default class Ship {
  constructor(length) {
    this.length = length || 1;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) return true;
    return false;
  }
}
