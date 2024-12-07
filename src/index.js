import "./styles.css";
import { Player, computerAttack } from "./player";
import { renderField, renderEnemy } from "./render";

const containers = document.querySelectorAll(".grid-container");

let [playerOne, playerTwo] = [Player(), Player()];
let turn = 0;

playerOne.randomise();
playerTwo.randomise();

renderField(containers[0], playerOne);
renderEnemy(containers[1], playerTwo);

const play = () => {
  if (turn == 0) {
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
          console.log("Game Over");
          renderField(containers[0], playerOne);
          renderField(containers[1], playerTwo);
        }
      });
    }
  } else {
    let coordinates = computerAttack(playerOne);
    playerOne.attack(coordinates);
    if (playerOne.isDamagedAt(coordinates) && !playerOne.isDefeated()) {
      renderField(containers[0], playerOne);
      play();
    } else if (!playerOne.isDefeated()) {
      renderField(containers[0], playerOne);
      turn = 0;
      play();
    } else {
      console.log("Game Over");
      renderField(containers[0], playerOne);
      renderField(containers[1], playerTwo);
    }
  }
};

play();
