import './popup.css';

interface GameOverPopupProps {
  isOpen: boolean;
  finalScore: number;
  onNewGame: () => void;
}

export default function GameOverPopup({
  isOpen,
  finalScore,
  onNewGame,
}: GameOverPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="game-over-popup__overlay">
      <div className="game-over-popup__container">
        <h2 className="game-over-popup__title">Game Over!</h2>

        <div className="game-over-popup__score-card">
          <span className="game-over-popup__score-label">Final Score</span>
          <span className="game-over-popup__score-value">
            {finalScore.toLocaleString()}
          </span>
        </div>

        <button className="game-over-popup__button" onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}
