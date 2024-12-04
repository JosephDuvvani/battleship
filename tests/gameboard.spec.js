import Gameboard, { createBoard } from "../src/gameboard";

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
