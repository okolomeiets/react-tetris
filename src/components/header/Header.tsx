import './header.css';
import { memo } from 'react';

type HeaderProps = {
  score: number;
  onPause: () => void;
  onResume: () => void;
};

const Header = memo(({ score, onPause, onResume }: HeaderProps) => {
  return (
    <header className="game-header">
      <div className="game-header__rail">
        <span className="game-header__rail-screw game-header__rail-screw--left" />
        <span className="game-header__rail-screw game-header__rail-screw--right" />
      </div>

      <div className="game-header__panel">
        <span className="game-header__panel-screw game-header__panel-screw--left" />
        <span className="game-header__panel-screw game-header__panel-screw--right" />

        <div className="game-header__panel-inner">
          <div className="game-header__score">SCORE: {score}</div>

          <div className="game-header__controls">
            <button
              className="game-header__button game-header__button--pause"
              onClick={onPause}
              tabIndex={-1}
            >
              PAUSE
            </button>

            <button
              className="game-header__button game-header__button--restore"
              onClick={onResume}
              tabIndex={-1}
            >
              RESTORE
            </button>
          </div>
        </div>

        <div className="game-header__glow-line" />
      </div>
    </header>
  );
});

export default Header;
