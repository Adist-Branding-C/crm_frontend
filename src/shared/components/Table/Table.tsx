import type { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps) => (
  <div className="table-scroll">
    <table className="data-table">{children}</table>
  </div>
);

export default Table;
