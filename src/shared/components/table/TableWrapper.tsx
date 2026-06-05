import type { ReactNode } from 'react';
import TableSkeleton from './TableSkeleton';
import ErrorMessage from '../ErrorMessage';

interface TableWrapperProps {
  isLoading: boolean;
  error: string;
  columns: number;
  skeletonRows?: number;
  children: ReactNode;
}

const TableWrapper = ({ isLoading, error, columns, skeletonRows, children }: TableWrapperProps) => {
  if (isLoading) return <TableSkeleton rows={skeletonRows ?? 5} columns={columns} />;
  if (error) return <ErrorMessage message={error} />;
  return <>{children}</>;
};

export default TableWrapper;
