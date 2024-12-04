import Ship from "./ship";

export const Gameboard = () => {
  let _board = createBoard(10);
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

  const getBoard = () => _board;

  return {
    placeShip,
    receiveAttack,
    isAllSunk,
    getBoard,
  };
};

export const createBoard = (length) => {
  let array = [];
  while (array.length < length) array.push([]);
  for (let inner of array) {
    while (inner.length < length) inner.push("$");
  }
  return array;
};
