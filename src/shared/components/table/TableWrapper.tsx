import type { ReactNode } from 'react';
import TableSkeleton from './TableSkeleton';
import ErrorMessage from '../ErrorMessage';
import EmptyState from '../EmptyState';

interface TableWrapperProps {
  isLoading: boolean;
  error: string;
  columns: number;
  skeletonRows?: number;
  children: ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

const TableWrapper = ({ isLoading, error, columns, skeletonRows, children, isEmpty, emptyMessage }: TableWrapperProps) => {
  if (isLoading) return <TableSkeleton rows={skeletonRows ?? 5} columns={columns} />;
  if (error) return <ErrorMessage message={error} />;
  if (isEmpty) return <EmptyState message={emptyMessage} />;
  return <>{children}</>;
};

export default TableWrapper;
