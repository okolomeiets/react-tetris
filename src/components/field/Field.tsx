import './field.css';
import Arrows from '../arrows/Arrows';
import { useState, useEffect, useCallback } from 'react';
import {
  allShapes,
  shape,
  initialState,
  createEmptyBoard,
} from '../../constants/constants';

export default function Field() {
  const [startPostion, setStartPosiion] = useState(initialState);
  const [board, setBoard] = useState(createEmptyBoard());
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);

  const getRandomShape = () => {
    const randomShape = shape[Math.floor(Math.random() * shape.length)];
    return allShapes[randomShape];
  };

  const [currentShape, setCurrentShape] = useState(getRandomShape);
  const [nextShape, setNextShape] = useState(getRandomShape);

  const field = board.map((row) => [...row]);

  for (let i = 0; i < currentShape.length; i++) {
    for (let j = 0; j < currentShape[i].length; j++) {
      if (currentShape[i][j] === 1) {
        field[startPostion.y + i][startPostion.x + j] = 1;
      }
    }
  }

  const hasCollision = useCallback(
    (nextX: number, nextY: number, shape: number[][]) => {
      for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
          if (shape[i][j] === 1) {
            const boardY = nextY + i;
            const boardX = nextX + j;
            if (boardY >= board.length || board[boardY][boardX] === 1) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board],
  );

  useEffect(() => {
    if (isGameOver || paused) return;
    const timer = setInterval(() => {
      if (!hasCollision(startPostion.x, startPostion.y + 1, currentShape)) {
        setStartPosiion((prev) => {
          return { ...prev, y: prev.y + 1 };
        });
      } else {
        setBoard(field);

        const filteredRows = field.filter(
          (row) => !row.every((cell) => cell === 1),
        );

        const removedRows = board.length - filteredRows.length;
        setScore((prev) => prev + removedRows * 100);

        const emptyRows = Array.from({ length: removedRows }, () =>
          Array(10).fill(0),
        );

        const newBoard = [...emptyRows, ...filteredRows];
        setBoard(newBoard);

        // for (let i = 0; i < field.length; i++) {
        //   for (let j = 0; j < field[i].length; j++) {
        //     if (field[i].every((item) => item === 1)) {
        //       field.splice(i, 1);
        //       field.unshift(emptyRow);
        //     }
        //   }
        // }

        // setBoard(field);
        if (hasCollision(initialState.x, initialState.y, nextShape)) {
          setIsGameOver(true);
          return;
        }

        setStartPosiion(initialState);
        setCurrentShape(nextShape);
        setNextShape(getRandomShape());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    currentShape,
    board,
    startPostion,
    field,
    hasCollision,
    nextShape,
    isGameOver,
    paused,
  ]);

  const handleOnStartNewGame = () => {
    setIsGameOver(false);
    setBoard(createEmptyBoard());
    setStartPosiion(initialState);
  };

  const handleOnMoveButtom = () => {
    if (!hasCollision(startPostion.x, startPostion.y + 1, currentShape)) {
      setStartPosiion((prev) => {
        return { ...prev, y: prev.y + 1 };
      });
    }
  };

  const handleOnMoveLeft = () => {
    if (
      startPostion.x !== 0 &&
      !hasCollision(startPostion.x - 1, startPostion.y, currentShape)
    ) {
      setStartPosiion((prev) => {
        return { ...prev, x: prev.x - 1 };
      });
    }
  };

  const handleOnMoveRight = () => {
    const cols = currentShape[0].length;
    if (
      startPostion.x < field[0].length - cols &&
      !hasCollision(startPostion.x + 1, startPostion.y, currentShape)
    ) {
      setStartPosiion((prev) => {
        return { ...prev, x: prev.x + 1 };
      });
    }
  };

  const handleOnRotate = () => {
    const rows = currentShape.length;
    const cols = currentShape[0].length;
    const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j][rows - 1 - i] = currentShape[i][j];
      }
    }
    const rotatedCols = rotated[0].length;

    if (startPostion.x <= field[0].length - rotatedCols) {
      setCurrentShape(rotated);
    }
  };

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
      <div className="game-header">
        <div>Score: {score}</div>

        {isGameOver ? (
          <div className="game-over-wrapper">
            <h3>Game Over!</h3>
            <button onClick={handleOnStartNewGame} tabIndex={-1}>
              Start New Game
            </button>
          </div>
        ) : (
          <div className="pause-buttons">
            <button onClick={() => setPaused(true)} tabIndex={-1}>
              Pause
            </button>
            <button onClick={() => setPaused(false)} tabIndex={-1}>
              Restore
            </button>
          </div>
        )}
      </div>

      <div className="field-wrapper">
        <div className="field">
          <div className="next-shape-wrapper">
            Next:
            <div className="next-shape">
              {nextShape.map((row, index) => (
                <div key={index} className="row">
                  {row.map((cell, index) => (
                    <div
                      key={index}
                      className={`cell ${cell === 1 ? 'filld' : ''}`}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="board">
            {field.map((row, index) => (
              <div key={index} className="row">
                {row.map((cell, index) => (
                  <div
                    key={index}
                    className={`cell ${cell === 1 ? 'filld' : ''} ${row.every((item) => item === 1) ? 'for-remove' : ''}`}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
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
