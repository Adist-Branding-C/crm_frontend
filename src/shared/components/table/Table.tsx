import type { TableProps } from './types';

const Table = ({ children }: TableProps) => (
  <div className="table-container">
    <table>{children}</table>
  </div>
);

export default Table;
