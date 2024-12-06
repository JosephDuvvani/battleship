import { Gameboard, checkCollision } from "./gameboard";

export const Player = () => {
  let gameBoard = Gameboard();
  const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

  const getBoard = () => gameBoard.getBoard();
  const getShips = () => ships;

  const randomise = () => {
    const length = gameBoard.getBoard().length;
    for (let i = 0; i < ships.length; i++) {
      let x = Math.floor(Math.random() * length);
      let y = Math.floor(Math.random() * length);
      if (checkCollision([x, y], gameBoard.getBoard())) {
        i--;
        continue;
      }
      let coordinates = [[x, y]];
      let direction = Math.floor(Math.random() * 2);
      for (let j = 1; j < ships[i]; j++) {
        if (direction === 0) {
          if (checkCollision([x + j, y], gameBoard.getBoard())) break;
          coordinates.push([x + j, y]);
        } else {
          if (checkCollision([x, y + j], gameBoard.getBoard())) break;
          coordinates.push([x, y + j]);
        }
      }
      if (coordinates.length < ships[i]) {
        i--;
        continue;
      }
      gameBoard.placeShip(coordinates.splice(0, ships[i]));
    }
  };

  const attack = (coordinates) => gameBoard.receiveAttack(coordinates);
  const isDefeated = () => gameBoard.isAllSunk();

  const isDamagedAt = (coordinates) => gameBoard.isDamagedAt(coordinates);

  return {
    getBoard,
    getShips,
    attack,
    isDefeated,
    randomise,
    isDamagedAt,
  };
};

export const computerAttack = (player) => {
  const board = player.getBoard();
  let invalid = [];
  let [y, x] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  while (invalid.length < board.length * board.length) {
    if (board[y][x] == "$") return [y, x];
    else if (board[y][x] >= 0 && !player.isDamagedAt([y, x])) return [y, x];
    else if (board[x][y] == "$") return [x, y];
    else if (board[x][y] >= 0 && !player.isDamagedAt([x, y])) return [x, y];
    else if (board[x][x] == "$") return [x, x];
    else if (board[x][x] >= 0 && !player.isDamagedAt([x, x])) return [x, x];
    else if (board[y][y] == "$") return [y, y];
    else if (board[y][y] >= 0 && !player.isDamagedAt([y, y])) return [y, y];

    invalid = [...invalid, [y, x], [x, y], [x, x], [y, y]];
    let isInvalid = true;
    while (isInvalid == true && invalid.length < board.length * board.length) {
      y = Math.floor(Math.random() * 10);
      x = Math.floor(Math.random() * 10);
      let check = 0;
      for (let xy of invalid) {
        if (xy[0] == y && xy[1] == x) {
          check++;
        }
      }
      if (check > 0) check = 0;
      else isInvalid = false;
    }
  }
};
