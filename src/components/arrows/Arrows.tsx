import './arrows.css';

interface ArrowsProps {
  startMoveDown: () => void;
  stopMoveDown: () => void;
  moveLeft: () => void;
  rotate: () => void;
  moveRight: () => void;
  disabled: boolean;
}

export default function Arrows({
  startMoveDown,
  stopMoveDown,
  moveLeft,
  rotate,
  moveRight,
  disabled,
}: ArrowsProps) {
  return (
    <div className="arrows">
      <div className="arrows-wrapper">
        <button
          type="button"
          onClick={moveLeft}
          onContextMenu={(event) => event.preventDefault()}
          disabled={disabled}
        >
          ←
        </button>
        <button
          type="button"
          onClick={rotate}
          onContextMenu={(event) => event.preventDefault()}
          disabled={disabled}
        >
          ↻
        </button>
        <button
          type="button"
          onClick={moveRight}
          onContextMenu={(event) => event.preventDefault()}
          disabled={disabled}
        >
          →
        </button>
      </div>

      <div className="arrow-bottom">
        <button
          type="button"
          onPointerDown={startMoveDown}
          onPointerUp={stopMoveDown}
          onPointerLeave={stopMoveDown}
          onPointerCancel={stopMoveDown}
          onContextMenu={(event) => event.preventDefault()}
          disabled={disabled}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
