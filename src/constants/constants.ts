export const allShapes = {
  square: [
    [1, 1],
    [1, 1],
  ],
  stick: [[1], [1], [1], [1]],
  lShape: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  reverseLShape: [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  zShape: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  tShape: [
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const shape = Object.keys(allShapes) as (keyof typeof allShapes)[];

export const initialState = {
  x: 4,
  y: 0,
};
