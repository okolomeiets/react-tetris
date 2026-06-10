import './Arrows.css';
import { memo } from 'react';

type ArrowsProps = {
  moveButtom: () => void;
  moveLeft: () => void;
  rotate: () => void;
  moveRight: () => void;
};

const Arrows = memo(
  ({ moveButtom, moveLeft, rotate, moveRight }: ArrowsProps) => {
    return (
      <div className="arrows-wrapper">
        <div className="arrows">
          <button onClick={moveLeft} tabIndex={-1}>
            &#8592;
          </button>
          <button onClick={rotate} tabIndex={-1}>
            &#8593;
          </button>
          <button onClick={moveRight} tabIndex={-1}>
            &#8594;
          </button>
          <div className="arrow-bottom">
            <button onClick={moveButtom} tabIndex={-1}>
              &#8595;
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default Arrows;
