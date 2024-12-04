import { mergeSort } from "./mergeSort";

export const getCoordinates = (start, end = start) => {
  if (start[0] !== end[0] && start[1] !== end[1]) return null;
  if (start[0] === end[0] && start[1] === end[1]) return [start];

  let coordinates = [];
  let big;
  let small;

  if (start[0] === end[0]) {
    if (start[1] > end[1]) {
      big = start[1];
      small = end[1];
    } else {
      big = end[1];
      small = start[1];
    }
    for (let i = small; i <= big; i++) coordinates.push([start[0], i]);
  } else {
    if (start[0] > end[0]) {
      big = start[0];
      small = end[0];
    } else {
      big = end[0];
      small = start[0];
    }
    for (let i = small; i <= big; i++) coordinates.push([i, start[1]]);
  }
  return coordinates;
};

export const isValidCoordinates = (coordinates, board) => {
  const horizontal = coordinates.filter((xy) => xy[0] === coordinates[0][0]);
  const vertical = coordinates.filter((xy) => xy[1] === coordinates[0][1]);
  if (horizontal.length === coordinates.length) {
    const y = mergeSort(coordinates.map((xy) => xy[1]));
    if (y[0] < 0 || y[y.length - 1] >= board.length) return false;
    let yValue = y[0];
    for (let i = 0; i < y.length; i++) {
      if (y[i] !== yValue) return false;
      if (typeof board[horizontal[0][0]][y[i]] === "number") return false;
      yValue++;
    }
    return true;
  } else if (vertical.length === coordinates.length) {
    const x = mergeSort(coordinates.map((xy) => xy[0]));
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
