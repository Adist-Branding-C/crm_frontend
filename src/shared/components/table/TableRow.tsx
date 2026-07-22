import type { TableRowProps } from './types';

const TableRow = ({ selected, children, className }: TableRowProps) => {
  const classes = [className, selected ? 'selected' : ''].filter(Boolean).join(' ');
  return <tr className={classes || undefined}>{children}</tr>;
};

export default TableRow;
