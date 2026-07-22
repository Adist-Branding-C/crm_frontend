import type { Column } from '../../types/crud';

interface TableRowProps<T> {
  item: T;
  column: Column<T>;
}

const TableRow = <T,>({ item, column }: TableRowProps<T>) => (
  <td className={column.className ?? ''}>
    {column.render ? column.render(item) : String(item[column.key as keyof T] ?? '')}
  </td>
);

export default TableRow;
