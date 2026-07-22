import type { TableCellProps } from './types';

const TableCell = ({ children, className, colSpan, onClick }: TableCellProps) => (
  <td className={className} colSpan={colSpan} onClick={onClick}>
    {children}
  </td>
);

export default TableCell;
