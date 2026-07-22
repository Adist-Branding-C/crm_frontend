import { LABEL_SL_NO, LABEL_ACTIONS } from '../../constants/labels';
import type { Column } from '../../types/crud';

interface TableHeaderProps<T> {
  columns: Column<T>[];
}

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => (
  <thead>
    <tr>
      <th>{LABEL_SL_NO}</th>
      {columns.map(col => (
        <th key={col.key}>{col.label}</th>
      ))}
      <th>{LABEL_ACTIONS}</th>
    </tr>
  </thead>
);

export default TableHeader;
