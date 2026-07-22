import EmptyState from './EmptyState';
import type { Column } from './types';

interface TableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  startIndex: number;
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
}

const TableBody = <T,>({ columns, data, startIndex, keyExtractor, emptyMessage }: TableBodyProps<T>) => (
  <tbody>
    {data.length === 0 ? (
      <EmptyState colSpan={columns.length} {...(emptyMessage ? { message: emptyMessage } : {})} />
    ) : (
      data.map((row, index) => (
        <tr key={keyExtractor(row)}>
          {columns.map((col, i) => (
            <td key={i} className={col.className}>
              {col.render
                ? col.render(row)
                : col.accessor
                  ? String(row[col.accessor] ?? '-')
                  : i === 0
                    ? startIndex + index + 1
                    : '-'}
            </td>
          ))}
        </tr>
      ))
    )}
  </tbody>
);

export default TableBody;
