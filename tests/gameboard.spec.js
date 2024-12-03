import Gameboard, { getBoard, isValidPosition } from "../gameboard";

describe("getBoard", () => {
  test("create board with length 10", () => {
    expect(getBoard(10).length).toBe(10);
  });
  test("create board with area 100", () => {
    const board = getBoard(10);
    const boardArea = board.length * board[0].length;
    expect(boardArea).toBe(100);
  });
});

describe("isValidPosition", () => {
  let board = getBoard(3);
  board[0][0] = -1;
  test("return false if index is out of bounds", () => {
    expect(isValidPosition([[1, 3]], board)).toBe(false);
  });
  test("return false if position jumps", () => {
    expect(
      isValidPosition(
        [
          [1, 0],
          [1, 2],
        ],
        board
      )
    ).toBe(false);
  });
  test("return false if place was hit before", () => {
    expect(isValidPosition([[0, 0]], board)).toBe(false);
  });
  test("return true if no jumps or hits, and places exist in board", () => {
    expect(
      isValidPosition(
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
