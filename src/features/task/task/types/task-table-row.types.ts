import type { TaskItem } from './task.types';

export interface TaskTableRowProps {
  item: TaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
}
