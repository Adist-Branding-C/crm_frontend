import type { DealTaskItem } from './dealTask.types';

export interface DealTaskTableProps {
  data: DealTaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
  onAdd: () => void;
  addLabel: string;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}
