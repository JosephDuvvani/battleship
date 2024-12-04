import Ship from "../src/ship";

describe("hit", () => {
  let ship;
  beforeAll(() => (ship = new Ship()));
  test("increments hits by 1 from 0", () => {
    let hits = ship.hits;
    ship.hit();
    expect(ship.hits).toBe(hits + 1);
  });
  test("increments hits by 1 from 1", () => {
    let hits = ship.hits;
    ship.hit();
    expect(ship.hits).toBe(hits + 1);
  });
});

describe("isSunk", () => {
  test("returns false if ship is not sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("returns true if ship is sunk", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
