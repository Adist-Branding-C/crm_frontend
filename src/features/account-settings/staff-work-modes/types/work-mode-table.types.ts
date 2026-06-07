import type { WorkModeItem } from './workMode.types';

export interface WorkModeTableProps {
  data: WorkModeItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
}
