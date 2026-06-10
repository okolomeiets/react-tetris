import { allShapes, shape } from '../constants/constants';

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

export const getRandomShape = () => {
  const randomShape = shape[Math.floor(Math.random() * shape.length)];
  return allShapes[randomShape];
};

export const rotateShape = (shape: number[][]): number[][] => {
  const rows = shape.length;
  const cols = shape[0].length;

  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = shape[i][j];
    }
  }

  return rotated;
};

export const clearLines = (board: number[][]) => {
  const filteredRows = board.filter((row) => !row.every((cell) => cell === 1));

  const removedRows = board.length - filteredRows.length;

  const emptyRows = Array.from({ length: removedRows }, () =>
    Array(board[0].length).fill(0),
  );

  return {
    board: [...emptyRows, ...filteredRows],
    removedRows,
  };
};

export const hasCollision = (
  board: number[][],
  nextX: number,
  nextY: number,
  shape: number[][],
): boolean => {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        const boardY = nextY + i;
        const boardX = nextX + j;

        if (
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length ||
          board[boardY][boardX] === 1
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const mergeShapeWithBoard = (
  board: number[][],
  shape: number[][],
  position: { x: number; y: number },
): number[][] => {
  const field = board.map((row) => [...row]);

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        field[position.y + i][position.x + j] = 1;
      }
    }
  }

  return field;
};
