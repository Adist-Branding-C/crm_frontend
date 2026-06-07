import type { DepartmentItem } from './department.types';

export interface DepartmentTableProps {
  data: DepartmentItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DepartmentItem) => void;
  onDelete: (item: DepartmentItem) => void;
}
