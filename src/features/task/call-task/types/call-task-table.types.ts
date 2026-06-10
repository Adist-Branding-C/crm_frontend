import type { CallTaskItem } from './callTask.types';

export interface CallTaskTableProps {
  data: CallTaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallTaskItem) => void;
  onDelete: (item: CallTaskItem) => void;
  onAdd: () => void;
  addLabel: string;
}
