import type { ChangeEvent } from 'react';

export interface TaskSettingsPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  showRowsSelector?: boolean;
}
