import { Gameboard } from "./gameboard";

export default () => {
  let gameBoard = Gameboard();
  const ships = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
  let placedShips = [];

  const getBoard = () => gameBoard.getBoard();
  const getShips = () => ships;
  const getPlacedShips = () => placedShips;

  const sendShip = (shipsIndex, coordinates) => {
    if (
      placedShips.includes(shipsIndex) ||
      shipsIndex < 0 ||
      shipsIndex >= ships.length
    )
      return;
    gameBoard.placeShip(coordinates);
    placedShips.push(shipsIndex);
  };

  const attack = (coordinates) => gameBoard.receiveAttack(coordinates);
  const isDefeated = () => gameBoard.isAllSunk();

  return {
    getBoard,
    getShips,
    getPlacedShips,
    sendShip,
    attack,
    isDefeated,
  };
};
