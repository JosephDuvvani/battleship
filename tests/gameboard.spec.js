import { createBoard, checkCollision } from "../src/gameboard";

describe("getBoard", () => {
  test("create board with length 10", () => {
    expect(createBoard(10).length).toBe(10);
  });
  test("create board with area 100", () => {
    const board = createBoard(10);
    const boardArea = board.length * board[0].length;
    expect(boardArea).toBe(100);
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
});
