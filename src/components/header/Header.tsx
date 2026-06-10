import './header.css';
import { memo } from 'react';

type HeaderProps = {
  score: number;

  onPause: () => void;
  onResume: () => void;
};

const Header = memo(
  ({
    score,

    onPause,
    onResume,
  }: HeaderProps) => {
    return (
      <div className="game-header">
        <div>Score: {score}</div>

        <div className="pause-buttons">
          <button onClick={onPause} tabIndex={-1}>
            Pause
          </button>
          <button onClick={onResume} tabIndex={-1}>
            Restore
          </button>
        </div>
      </div>
    );
  },
);

export default Header;
