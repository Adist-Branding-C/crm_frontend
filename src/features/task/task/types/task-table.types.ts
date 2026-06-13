import type { TaskItem } from './task.types';

export interface TaskTableProps {
  data: TaskItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
  onAdd: () => void;
  addLabel: string;
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}
