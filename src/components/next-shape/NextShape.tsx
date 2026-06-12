import './next-shape.css';
import { memo } from 'react';

type NextShapeProps = {
  nextShape: number[][];
};

const NextShape = memo(({ nextShape }: NextShapeProps) => {
  return (
    <div className="next-shape-wrapper">
      <span className="next-shape-wrapper__label">Next:</span>

      <div className="next-shape">
        {nextShape.map((row, rowIndex) => (
          <div key={rowIndex} className="next-shape__row">
            {row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`next-shape__cell ${
                  cell === 1 ? 'next-shape__cell--filled' : ''
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default NextShape;
