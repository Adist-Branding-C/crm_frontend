import type { DealTaskItem } from './dealTask.types';

export interface DealTaskTableProps {
  data: DealTaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: number) => void;
  totalRecords: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
  onAdd: () => void;
  addLabel: string;
}
