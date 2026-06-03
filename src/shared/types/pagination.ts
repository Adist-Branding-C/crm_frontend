import type { ChangeEvent } from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  onRowsPerPageChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}
