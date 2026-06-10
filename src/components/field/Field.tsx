import './field.css';
import Arrows from '../arrows/Arrows';
import { useEffect, useCallback, useMemo, useReducer } from 'react';
import Header from '../header/Header';
import NextShape from '../next-shape/NextShape';
import Board from '../board/Board';
import { gameReducer, initialGameState } from '../../reducers/gameReducer';
import { mergeShapeWithBoard } from '../../utils/gameUtils';

export default function Field() {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  const {
    board,
    currentShape,
    nextShape,
    startPostion,
    score,
    isGameOver,
    paused,
  } = gameState;
  const field = useMemo(() => {
    return mergeShapeWithBoard(board, currentShape, startPostion);
  }, [board, currentShape, startPostion]);

  useEffect(() => {
    if (isGameOver || paused) return;

    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isGameOver, paused]);

  const handleOnMoveButtom = useCallback(() => {
    dispatch({ type: 'MOVE_DOWN' });
  }, []);

  const handleOnMoveLeft = useCallback(() => {
    dispatch({ type: 'MOVE_LEFT' });
  }, []);

  const handleOnMoveRight = useCallback(() => {
    dispatch({ type: 'MOVE_RIGHT' });
  }, []);

  const handleOnRotate = useCallback(() => {
    dispatch({ type: 'ROTATE' });
  }, []);

  const handleOnPause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const handleOnResume = useCallback(() => {
    dispatch({ type: 'RESUME' });
  }, []);

  const handleOnStartNewGame = useCallback(() => {
    dispatch({ type: 'START_NEW_GAME' });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        handleOnMoveLeft();
      }
      if (event.key === 'ArrowRight') {
        handleOnMoveRight();
      }
      if (event.key === 'ArrowDown') {
        handleOnMoveButtom();
      }
      if (event.key === 'ArrowUp') {
        handleOnRotate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOnMoveLeft, handleOnMoveRight, handleOnMoveButtom, handleOnRotate]);

  return (
    <div className="game">
      <Header
        score={score}
        isGameOver={isGameOver}
        onPause={handleOnPause}
        onResume={handleOnResume}
        handleOnStartNewGame={handleOnStartNewGame}
      />

      <div className="field-wrapper">
        <div className="field">
          <NextShape nextShape={nextShape} />
          <Board field={field} />
        </div>
      </div>

      <Arrows
        moveButtom={handleOnMoveButtom}
        moveLeft={handleOnMoveLeft}
        rotate={handleOnRotate}
        moveRight={handleOnMoveRight}
      />
    </div>
  );
}
