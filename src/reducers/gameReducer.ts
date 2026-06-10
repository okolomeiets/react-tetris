import { initialState } from '../constants/constants';
import {
  hasCollision,
  rotateShape,
  mergeShapeWithBoard,
  clearLines,
  getRandomShape,
  createEmptyBoard,
} from '../utils/gameUtils';

export type GameState = {
  board: number[][];
  currentShape: number[][];
  nextShape: number[][];
  startPostion: {
    x: number;
    y: number;
  };
  score: number;
  isGameOver: boolean;
  paused: boolean;
};

export type GameAction =
  | { type: 'MOVE_DOWN' }
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'ROTATE' }
  | { type: 'TICK' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'START_NEW_GAME' };

export const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentShape: getRandomShape(),
  nextShape: getRandomShape(),
  startPostion: initialState,
  score: 0,
  isGameOver: false,
  paused: false,
};

export const gameReducer = (
  state: GameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case 'MOVE_DOWN': {
      const canMoveDown = !hasCollision(
        state.board,
        state.startPostion.x,
        state.startPostion.y + 1,
        state.currentShape,
      );

      if (!canMoveDown) {
        return state;
      }

      return {
        ...state,
        startPostion: {
          ...state.startPostion,
          y: state.startPostion.y + 1,
        },
      };
    }

    case 'MOVE_LEFT': {
      const canMoveLeft = !hasCollision(
        state.board,
        state.startPostion.x - 1,
        state.startPostion.y,
        state.currentShape,
      );

      if (!canMoveLeft) return state;

      return {
        ...state,
        startPostion: {
          ...state.startPostion,
          x: state.startPostion.x - 1,
        },
      };
    }

    case 'MOVE_RIGHT': {
      const canMoveRight = !hasCollision(
        state.board,
        state.startPostion.x + 1,
        state.startPostion.y,
        state.currentShape,
      );

      if (!canMoveRight) return state;

      return {
        ...state,
        startPostion: {
          ...state.startPostion,
          x: state.startPostion.x + 1,
        },
      };
    }

    case 'ROTATE': {
      const rotated = rotateShape(state.currentShape);

      const canRotate = !hasCollision(
        state.board,
        state.startPostion.x,
        state.startPostion.y,
        rotated,
      );

      if (!canRotate) return state;

      return {
        ...state,
        currentShape: rotated,
      };
    }

    case 'TICK': {
      const canMoveDown = !hasCollision(
        state.board,
        state.startPostion.x,
        state.startPostion.y + 1,
        state.currentShape,
      );

      if (canMoveDown) {
        return {
          ...state,
          startPostion: {
            ...state.startPostion,
            y: state.startPostion.y + 1,
          },
        };
      }

      const field = mergeShapeWithBoard(
        state.board,
        state.currentShape,
        state.startPostion,
      );

      const { board: newBoard, removedRows } = clearLines(field);

      const isGameOver = hasCollision(
        newBoard,
        initialState.x,
        initialState.y,
        state.nextShape,
      );

      if (isGameOver) {
        return {
          ...state,
          board: newBoard,
          score: state.score + removedRows * 100,
          isGameOver: true,
        };
      }

      return {
        ...state,
        board: newBoard,
        score: state.score + removedRows * 100,
        startPostion: initialState,
        currentShape: state.nextShape,
        nextShape: getRandomShape(),
      };
    }

    case 'PAUSE':
      return {
        ...state,
        paused: true,
      };

    case 'RESUME':
      return {
        ...state,
        paused: false,
      };

    case 'START_NEW_GAME':
      return {
        ...initialGameState,
        board: createEmptyBoard(),
        currentShape: getRandomShape(),
        nextShape: getRandomShape(),
      };

    default:
      return state;
  }
};
