import './field.css';
import Arrows from '../arrows/Arrows';
import { useEffect, useCallback, useMemo, useReducer, useRef } from 'react';
import Header from '../header/Header';
import NextShape from '../next-shape/NextShape';
import Board from '../board/Board';
import { gameReducer, initialGameState } from '../../reducers/gameReducer';
import { mergeShapeWithBoard } from '../../utils/gameUtils';
import GameOverPopup from '../popup/popup';
import Footer from '../footer/Footer';

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
  const moveDownIntervalRef = useRef<number | null>(null);
  const canPlay = !isGameOver && !paused;

  const field = useMemo(() => {
    return mergeShapeWithBoard(board, currentShape, startPostion);
  }, [board, currentShape, startPostion]);

  useEffect(() => {
    if (!canPlay) return;

    const timer = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [canPlay]);

  const handleOnMoveBottom = useCallback(() => {
    if (!canPlay) return;
    dispatch({ type: 'MOVE_DOWN' });
  }, [canPlay]);

  const handleOnMoveLeft = useCallback(() => {
    if (!canPlay) return;
    dispatch({ type: 'MOVE_LEFT' });
  }, [canPlay]);

  const handleOnMoveRight = useCallback(() => {
    if (!canPlay) return;
    dispatch({ type: 'MOVE_RIGHT' });
  }, [canPlay]);

  const handleOnRotate = useCallback(() => {
    if (!canPlay) return;
    dispatch({ type: 'ROTATE' });
  }, [canPlay]);

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
    if (!canPlay) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handleOnMoveLeft();
          break;

        case 'ArrowRight':
          event.preventDefault();
          handleOnMoveRight();
          break;

        case 'ArrowDown':
          event.preventDefault();
          handleOnMoveBottom();
          break;

        case 'ArrowUp':
          event.preventDefault();

          if (event.repeat) return;

          handleOnRotate();
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    canPlay,
    handleOnMoveLeft,
    handleOnMoveRight,
    handleOnMoveBottom,
    handleOnRotate,
  ]);

  const stopMoveDown = useCallback(() => {
    if (moveDownIntervalRef.current !== null) {
      window.clearInterval(moveDownIntervalRef.current);
      moveDownIntervalRef.current = null;
    }
  }, []);

  const startMoveDown = useCallback(() => {
    if (!canPlay) return;

    dispatch({ type: 'MOVE_DOWN' });

    if (moveDownIntervalRef.current !== null) return;

    moveDownIntervalRef.current = window.setInterval(() => {
      dispatch({ type: 'MOVE_DOWN' });
    }, 80);
  }, [canPlay]);

  useEffect(() => {
    if (!canPlay) {
      stopMoveDown();
    }
    return () => {
      stopMoveDown();
    };
  }, [canPlay, stopMoveDown]);

  return (
    <div className="game">
      <Header score={score} onPause={handleOnPause} onResume={handleOnResume} />

      <div className="field-wrapper">
        <div className="field">
          <NextShape nextShape={nextShape} />
          <Board field={field} />
        </div>
      </div>

      <Arrows
        startMoveDown={startMoveDown}
        stopMoveDown={stopMoveDown}
        moveLeft={handleOnMoveLeft}
        rotate={handleOnRotate}
        moveRight={handleOnMoveRight}
        disabled={!canPlay}
      />

      <GameOverPopup
        isOpen={isGameOver}
        finalScore={score}
        onNewGame={handleOnStartNewGame}
      />
      <Footer />
    </div>
  );
}
