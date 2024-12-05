import {
  isValidCoordinates,
  getCoordinates,
  checkCollision,
} from "../src/coordinates";
import { createBoard } from "../src/gameboard";

describe("getCoordinates", () => {
  test("Start and End on the same row, return list", () => {
    expect(getCoordinates([1, 1], [1, 3]).length).toEqual(3);
  });
  test("Start and End on the same column, return list", () => {
    expect(getCoordinates([1, 1], [3, 1]).length).toEqual(3);
  });
  test("Start and End not on same row or column, return null", () => {
    expect(getCoordinates([1, 1], [2, 3])).toEqual(null);
  });
  test("Start and End are the same, return list with one", () => {
    expect(getCoordinates([1, 1], [1, 1]).length).toBe(1);
  });
});

describe("isValidCoordinates", () => {
  let board = createBoard(3);
  board[0][0] = -1;
  test("return false if index is out of bounds", () => {
    expect(isValidCoordinates([[1, 3]], board)).toBe(false);
  });
  test("return false if position jumps", () => {
    expect(
      isValidCoordinates(
        [
          [1, 0],
          [1, 2],
        ],
        board
      )
    ).toBe(false);
  });
  test("return false if place was hit before", () => {
    expect(isValidCoordinates([[0, 0]], board)).toBe(false);
  });
  test("return true if no jumps or hits", () => {
    expect(
      isValidCoordinates(
        [
          [1, 0],
          [1, 1],
          [1, 2],
        ],
        board
      )
    ).toBe(true);
  });
});

describe("collision", () => {
  let board = createBoard(4);
  board[1][1] = 1;
  test("return true if adjacent cell is not empty", () => {
    expect(checkCollision([1, 2], board, 2)).toBe(true);
  });
  test("return false if adjacent cells are empty", () => {
    expect(checkCollision([1, 3], board, 2)).toBe(false);
  });
  test("return false if adjacent cells are empty", () => {
    expect(checkCollision([3, 3], board, 2)).toBe(false);
  });
  test("return false if adjacent cell has the same value", () => {
    expect(checkCollision([1, 2], board, 1)).toBe(false);
  });
});
