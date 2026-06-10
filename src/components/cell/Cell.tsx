import { memo } from 'react';
import './cell.css';

type CellProps = {
  cell: number;
  isRowFilled: boolean;
};

const Cell = memo(({ cell, isRowFilled }: CellProps) => {
  return (
    <div
      className={`cell ${cell === 1 ? 'filled' : ''} ${isRowFilled ? 'for-remove' : ''}`}
    >
      {cell}
    </div>
  );
});

export default Cell;
