import type { ReactNode, ChangeEvent } from 'react';
import type { SortConfig } from '../../types/sort';

export interface TableProps {
  children?: ReactNode;
}

export interface TableHeadProps {
  children?: ReactNode;
}

export interface TableBodyProps {
  children?: ReactNode;
}

export interface TableHeaderCellProps {
  sortable?: boolean;
  sortKey?: string;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  isCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
}

export interface TableRowProps {
  selected?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface TableCellProps {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
  onClick?: () => void;
}

export interface TableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
}

export interface ActionMenuProps {
  isOpen: boolean;
  buttonRect: DOMRect | null;
  onToggle: (rect: DOMRect | null) => void;
  onClose: () => void;
  children?: ReactNode;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number | ((prev: number) => number)) => void;
  onRowsPerPageChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  rowsPerPageOptions?: readonly number[];
  showRowsSelector?: boolean;
  labelRowsPerPage?: string;
  labelShowing?: string;
  labelOf?: string;
  labelPage?: string;
  labelFirst?: string;
  labelLast?: string;
}
