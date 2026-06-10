import Row from '../row/Row';
import './board.css';

type BoardProps = {
  field: number[][];
};

export default function Board({ field }: BoardProps) {
  return (
    <div className="board">
      {field.map((row, index) => (
        <Row key={index} row={row} />
      ))}
    </div>
  );
}
