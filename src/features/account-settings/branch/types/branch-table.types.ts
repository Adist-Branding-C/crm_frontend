import type { BranchItem } from './branch.types';

export interface BranchTableProps {
  data: BranchItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: BranchItem) => void;
  onDelete: (item: BranchItem) => void;
}
