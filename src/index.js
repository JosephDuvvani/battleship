import "./styles.css";
import { Player, computerAttack, getShipPosition } from "./player";
import { renderField, renderEnemy } from "./render";
import { checkCollision } from "./gameboard";

const containers = document.querySelectorAll(".grid");
const playCall = document.querySelector(".play-call");
const playCallMsg = document.getElementById("play-call-message");
const playButton = document.querySelector(".play-button");
const placeOverlays = document.querySelectorAll(".grid-overlay_place");
const turnOverlays = document.querySelectorAll(".grid-overlay_turn");
const readyPlayer = document.querySelectorAll(".ready-player-button-container");
const playOptions = document.querySelector(".play-options-container");
const playOptionsOne = document.querySelector(".play-options-button_one");
const playOptionsTwo = document.querySelector(".play-options-button_two");
const playerTitles = document.querySelectorAll(".player-title");

let playerOne;
let playerTwo;
let turn;

const choosePlayOption = () => {
  playOptionsOne.addEventListener("click", () => {
    placeOverlays[0].classList.toggle("hide", false);
    playerTitles[0].classList.toggle("hide", false);
    playerTitles[1].classList.toggle("hide", false);
    playOptions.classList.toggle("hide", true);
    start();
  });
  playOptionsTwo.addEventListener("click", () => {
    placeOverlays[0].classList.toggle("hide", false);
    playerTitles[0].classList.toggle("hide", false);
    playerTitles[1].classList.toggle("hide", false);
    playOptions.classList.toggle("hide", true);
    start(2);
  });
};

choosePlayOption();

const start = (players = 1) => {
  [playerOne, playerTwo] = [Player(), Player()];
  turn = 0;

  playerOne.randomise();
  playerTwo.randomise();

  renderEnemy(containers[0], playerOne);
  renderEnemy(containers[1], playerTwo);

  placeOverlays[0].addEventListener("click", () => {
    revealShips(placeOverlays[0], containers[0], playerOne, readyPlayer[0]);

    readyPlayer[0].addEventListener("click", () => {
      if (players == 1) {
        readyPlayer[0].classList.toggle("hide", true);
        playButton.classList.toggle("hide", false);
        playButton.addEventListener("click", () => {
          play();
          playButton.classList.toggle("hide", true);
        });
        return;
      }
      renderEnemy(containers[0], playerOne);
      readyPlayer[0].classList.toggle("hide", true);
      placeOverlays[1].classList.toggle("hide", false);

      placeOverlays[1].addEventListener("click", () => {
        revealShips(placeOverlays[1], containers[1], playerTwo, readyPlayer[1]);

        readyPlayer[1].addEventListener("click", () => {
          renderEnemy(containers[1], playerTwo);
          readyPlayer[1].classList.toggle("hide", true);
          playButton.classList.toggle("hide", false);

          playButton.addEventListener("click", () => {
            turnOverlays[0].classList.toggle("hide", false);
            turnOverlays[0].addEventListener("click", () => {
              turnOverlays[0].classList.toggle("hide", true);
              renderField(containers[0], playerOne);
              renderEnemy(containers[1], playerTwo);
              play(players);
            });
            playButton.classList.toggle("hide", true);
          });
        });
      });
    });
  });
};

const revealShips = (overlay, grid, player, ready) => {
  overlay.classList.toggle("hide", true);
  renderField(grid, player, true);
  drag(player, grid);
  ready.classList.toggle("hide", false);
};

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

const drop = (dragPosition, initial, player, index, grid) => {
  const dropCells = document.querySelectorAll(".battlefield-cell_drop");
  const table = document.querySelector(".battlefield-table_drag");

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

const play = (players = 1) => {
  if (turn == 0) {
    playCall.style.backgroundColor = "var(--clr-greenlight)";
    playCallMsg.textContent = "Player One's turn";
    attackEnemy(playerTwo, 1, playerOne, 0, players);
  } else if (players == 1 && turn != 0) {
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
  } else {
    playCall.style.backgroundColor = "var(--secondary)";
    playCallMsg.textContent = "Player Two's turn";
    attackEnemy(playerOne, 0, playerTwo, 1, players);
  }
};

const attackEnemy = (enemy, enemyIndex, player, playerIndex, players) => {
  const cells = document.querySelectorAll(".battlefield-cell_cover");
  for (let target of cells) {
    target.addEventListener("click", (e) => {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      if (!x || !y) return;
      enemy.attack([y, x]);
      if (enemy.isDamagedAt([y, x]) && !enemy.isDefeated()) {
        renderEnemy(containers[enemyIndex], enemy);
        play(players);
      } else if (!enemy.isDefeated()) {
        renderEnemy(containers[enemyIndex], enemy);
        turn = enemyIndex;
        if (players != 1) {
          setTimeout(() => {
            renderEnemy(containers[playerIndex], player);
            turnOverlays[enemyIndex].classList.toggle("hide", false);
            turnOverlays[enemyIndex].addEventListener("click", () => {
              turnOverlays[enemyIndex].classList.toggle("hide", true);
              renderField(containers[enemyIndex], enemy);
              play(players);
            });
          }, 1000);
        } else play();
      } else {
        playCall.style.background = "var(--clr-winner)";
        playCallMsg.textContent = "Game Over!!!";
        renderField(containers[playerIndex], player);
        renderField(containers[enemyIndex], enemy);
      }
    });
  }
};
