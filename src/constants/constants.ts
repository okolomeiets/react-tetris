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
  zShape: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  tShape: [
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const shape = ['square', 'stick', 'lShape', 'zShape', 'tShape'] as const;

export const initialState = {
  x: 4,
  y: 0,
};

export const createEmptyBoard = () => {
  const field: number[][] = [];

  for (let i = 0; i < 20; i++) {
    const row: number[] = [];
    field.push(row);
    for (let j = 0; j < 10; j++) {
      const cell: number = 0;
      field[i].push(cell);
    }
  }

  return field;
};
