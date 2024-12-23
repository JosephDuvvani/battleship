export const renderField = (container, player, drag = false) => {
  const board = player.getBoard();
  const table = document.createElement("table");
  table.classList.add("battlefield-table");

  if (drag == true) table.classList.add("battlefield-table_drag");

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let j = 0; j < board.length; j++) {
    const tr = document.createElement("tr");
    tr.classList.add("battlefield-row");

    for (let i = 0; i < board[j].length; i++) {
      const td = document.createElement("td");
      td.classList.add("battlefield-cell");

      const data = document.createElement("div");
      data.classList.add("battlefield-cell-content");
      if (board[j][i] === "$") data.classList.add("battlefield-cell_empty");
      else if (player.isDamagedAt([j, i])) {
        data.classList.add("battlefield-cell_hit");
        if (player.isSunk(board[j][i])) {
          const sunk = document.createElement("div");
          sunk.classList.add("battlefield-ship_sunk");
          data.appendChild(sunk);
        }
      } else if (board[j][i] === -1)
        data.classList.add("battlefield-cell_missed");
      else if (board[j][i] >= 0) data.classList.add("battlefield-cell_ship");

      if (drag === true && board[j][i] >= 0)
        data.classList.add("battlefield-cell_drag");
      if (drag === true) data.classList.add("battlefield-cell_drop");

      data.dataset.y = j;
      data.dataset.x = i;

      td.appendChild(data);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  container.textContent = "";
  container.appendChild(table);
};

export const renderEnemy = (container, player) => {
  const board = player.getBoard();
  const table = document.createElement("table");
  table.classList.add("battlefield-table");

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (let j = 0; j < board.length; j++) {
    const tr = document.createElement("tr");
    tr.classList.add("battlefield-row");

    for (let i = 0; i < board[j].length; i++) {
      const td = document.createElement("td");
      td.classList.add("battlefield-cell");

      const data = document.createElement("div");
      data.classList.add("battlefield-cell-content");
      if (board[j][i] === -1) data.classList.add("battlefield-cell_missed");
      else if (player.isDamagedAt([j, i])) {
        data.classList.add("battlefield-cell_hit");
        if (player.isSunk(board[j][i])) {
          const sunk = document.createElement("div");
          sunk.classList.add("battlefield-ship_sunk");
          data.appendChild(sunk);
        }
      } else data.classList.add("battlefield-cell_cover");

      data.dataset.y = j;
      data.dataset.x = i;

      td.appendChild(data);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  container.textContent = "";
  container.appendChild(table);
};
