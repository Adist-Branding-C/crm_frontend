import type { DesignationItem } from './designation.types';

export interface DesignationTableProps {
  data: DesignationItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  pageNumber: number;
  onPageChange: (page: number) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
}
