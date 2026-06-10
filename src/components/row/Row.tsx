import { memo, useMemo } from 'react';
import Cell from '../cell/Cell';
import './row.css';

type RowProps = {
  row: number[];
};

const Row = memo(({ row }: RowProps) => {
  const isRowFilled = useMemo(() => {
    return row.every((item) => item === 1);
  }, [row]);

  return (
    <div className="row">
      {row.map((cell, index) => (
        <Cell key={index} cell={cell} isRowFilled={isRowFilled} />
      ))}
    </div>
  );
});

export default Row;
