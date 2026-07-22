import { ChevronUp, ChevronDown } from 'lucide-react';
import TableCheckbox from './TableCheckbox';
import type { TableHeaderCellProps } from './types';

const TableHeaderCell = ({ sortable, sortKey, sortConfig, onSort, isCheckbox, checked, onCheckboxChange, children, className }: TableHeaderCellProps) => {
  if (isCheckbox) {
    return (
      <th className={className}>
        <TableCheckbox checked={!!checked} onChange={(v) => onCheckboxChange?.(v)} />
      </th>
    );
  }

  const active = sortConfig?.key === sortKey;
  const classes = [className, sortable ? 'sortable' : ''].filter(Boolean).join(' ');

  return (
    <th className={classes || undefined} onClick={sortable ? () => onSort?.(sortKey!) : undefined}>
      {children}
      {sortable && active && (
        sortConfig?.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
      )}
    </th>
  );
};

export default TableHeaderCell;
