import Ship from "./ship";
import mergeSort from "./mergeSort";

export default Gameboard = () => {
  let _board = getBoard(10);
  let _myShips = [];

  const placeShip = (position) => {
    for (let coordinates of position) {
      _board[coordinates[0]][coordinates[1]] = _myShips.length;
    }
    -_myShips.push(new Ship(position.length));
  };

  const receiveAttack = (xy) => {
    const shipIndex = _board[xy[0]][xy[1]];
    shipIndex === "$" || shipIndex === -1
      ? (_board[xy[0]][xy[1]] = -1)
      : _myShips[shipIndex].hit();
  };

  const isAllSunk = () => {
    for (let ship of _myShips) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  return {
    placeShip,
    receiveAttack,
    isAllSunk,
  };
};

export const getBoard = (length) => {
  let array = [];
  while (array.length < length) array.push([]);
  for (let inner of array) {
    while (inner.length < length) inner.push("$");
  }
  return array;
};

export const isValidPosition = (place, board) => {
  const horizontal = place.filter((xy) => xy[0] === place[0][0]);
  const vertical = place.filter((xy) => xy[1] === place[0][1]);
  if (horizontal.length === place.length) {
    const y = mergeSort(place.map((xy) => xy[1]));
    if (y[0] < 0 || y[y.length - 1] >= board.length) return false;
    let yValue = y[0];
    for (let i = 0; i < y.length; i++) {
      if (y[i] !== yValue) return false;
      if (typeof board[horizontal[0][0]][y[i]] === "number") return false;
      yValue++;
    }
    return true;
  } else if (vertical.length === place.length) {
    const x = mergeSort(place.map((xy) => xy[0]));
    if (x[0] < 0 || x[x.length - 1] >= board.length) return false;
    let xValue = x[0];
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== xValue) return false;
      if (typeof board[vertical[0][0]][x[i]] === "number") return false;
      xValue++;
    }
    return true;
  }
  return false;
};
