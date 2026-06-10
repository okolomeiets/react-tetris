import './next-shape.css';
import { memo } from 'react';

type NextShapeProps = {
  nextShape: number[][];
};

const NextShape = memo(({ nextShape }: NextShapeProps) => {
  return (
    <div className="next-shape-wrapper">
      Next:
      <div className="next-shape">
        {nextShape.map((row, index) => (
          <div key={index} className="row">
            {row.map((cell, index) => (
              <div key={index} className={`cell ${cell === 1 ? 'filled' : ''}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default NextShape;
