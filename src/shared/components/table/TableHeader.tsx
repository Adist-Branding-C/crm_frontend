import type { Column } from './types';

interface TableHeaderProps<T> {
  columns: Column<T>[];
}

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => (
  <thead>
    <tr>
      {columns.map((col, i) => (
        <th key={i} className={col.className} style={col.width ? { width: col.width } : undefined}>
          {col.header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
