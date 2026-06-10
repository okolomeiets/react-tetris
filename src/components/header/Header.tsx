import './header.css';
import { memo } from 'react';

type HeaderProps = {
  score: number;
  isGameOver: boolean;
  onPause: () => void;
  onResume: () => void;
  handleOnStartNewGame: () => void;
};

const Header = memo(
  ({
    score,
    isGameOver,
    onPause,
    onResume,
    handleOnStartNewGame,
  }: HeaderProps) => {
    return (
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
            <button onClick={onPause} tabIndex={-1}>
              Pause
            </button>
            <button onClick={onResume} tabIndex={-1}>
              Restore
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default Header;
