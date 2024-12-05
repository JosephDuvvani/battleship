import { Gameboard } from "./gameboard";
import { checkCollision } from "./coordinates";

export default () => {
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

  return {
    getBoard,
    getShips,
    attack,
    isDefeated,
    randomise,
  };
};
