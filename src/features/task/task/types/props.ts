import type { TaskItem } from './interface';

export interface TaskRowProps {
  item: TaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
}
