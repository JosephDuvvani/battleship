import "./styles.css";
import { Player, computerAttack, getShipPosition } from "./player";
import { renderField, renderEnemy } from "./render";
import { checkCollision } from "./gameboard";

const containers = document.querySelectorAll(".grid-container");
const playCall = document.querySelector(".play-call");
const playCallMsg = document.getElementById("play-call-message");
const playButton = document.querySelector(".play-button");

let [playerOne, playerTwo] = [Player(), Player()];
let turn = 0;

playerOne.randomise();
playerTwo.randomise();

renderField(containers[0], playerOne, true);
renderEnemy(containers[1], playerTwo, true);

const drag = (player, grid) => {
  const dragCells = document.querySelectorAll(".battlefield-cell_drag");
  for (let cell of dragCells) {
    cell.addEventListener("mousedown", (e) => {
      let dragPosition;
      const x = +e.target.dataset.x;
      const y = +e.target.dataset.y;
      dragPosition = getShipPosition(
        [y, x],
        player.getBoard(),
        player.getShips()
      );
      const shipIndex = player.getBoard()[y][x];
      player.removeShip(dragPosition);
      renderField(grid, player, true);
      drop(dragPosition, [y, x], player, shipIndex, grid);
    });
  }
};
drag(playerOne, containers[0]);

const drop = (dragPosition, initial, player, index, grid) => {
  const dropCells = document.querySelectorAll(".battlefield-cell_drop");
  const table = document.querySelector(".battlefield-table");

  table.addEventListener("mouseleave", () => {
    player.dropShip(dragPosition, index);
    renderField(grid, player, true);
    drag(player, grid);
  });

  table.addEventListener("mouseup", () => {
    player.dropShip(dragPosition, index);
    renderField(grid, player, true);
    drag(player, grid);
  });

  let dropPosition = [];
  for (let cell of dropCells) {
    cell.addEventListener("mouseup", (e) => {
      const x = +e.target.dataset.x;
      const y = e.target.dataset.y;
      let yDiff = initial[0] - y;
      let xDiff = initial[1] - x;
      for (let pos of dragPosition) {
        let yx = [pos[0] - yDiff, pos[1] - xDiff];
        if (checkCollision(yx, player.getBoard())) {
          player.dropShip(dragPosition, index);
          renderField(grid, player, true);
          drag(player, grid);
          return;
        }
        dropPosition.push(yx);
      }
      player.dropShip(dropPosition, index);
      renderField(grid, player, true);
      drag(player, grid);
      e.stopPropagation();
    });
  }
};

const play = () => {
  if (turn == 0) {
    playCall.style.backgroundColor = "var(--clr-greenlight)";
    playCallMsg.textContent = "Player One's turn";
    const cells = document.querySelectorAll(".battlefield-cell_cover");
    for (let target of cells) {
      target.addEventListener("click", (e) => {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;
        if (!x || !y) return;
        playerTwo.attack([y, x]);
        if (playerTwo.isDamagedAt([y, x]) && !playerTwo.isDefeated()) {
          renderEnemy(containers[1], playerTwo);
          play();
        } else if (!playerTwo.isDefeated()) {
          renderEnemy(containers[1], playerTwo);
          turn = 1;
          play();
        } else {
          playCall.style.background = "var(--clr-winner)";
          playCallMsg.textContent = "Winner: PLAYER ONE!!!";
          renderField(containers[0], playerOne);
          renderField(containers[1], playerTwo);
        }
      });
    }
  } else {
    playCall.style.backgroundColor = "var(--secondary)";
    playCallMsg.textContent = "Player Two's turn";
    let coordinates = computerAttack(playerOne);
    setTimeout(function () {
      playerOne.attack(coordinates);
      if (playerOne.isDamagedAt(coordinates) && !playerOne.isDefeated()) {
        renderField(containers[0], playerOne);
        play();
      } else if (!playerOne.isDefeated()) {
        renderField(containers[0], playerOne);
        turn = 0;
        play();
      } else {
        playCall.style.background = "var(--clr-winner)";
        playCallMsg.textContent = "Winner: PLAYER TWO!!!";
        renderField(containers[0], playerOne);
        renderField(containers[1], playerTwo);
      }
    }, 1000);
  }
};

playButton.addEventListener("click", play);
