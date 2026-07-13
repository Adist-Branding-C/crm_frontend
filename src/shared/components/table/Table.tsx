import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface TableProps extends ComponentPropsWithoutRef<'table'> {
  wrapperClassName?: string;
  children?: ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ wrapperClassName = 'table-scroll', className = 'data-table', children, ...props }, ref) => (
    <div className={wrapperClassName}>
      <table ref={ref} className={className} {...props}>
        {children}
      </table>
    </div>
  ),
);

Table.displayName = 'Table';

export default Table;
