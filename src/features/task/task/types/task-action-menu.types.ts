import type { TaskItem } from './task.types';

export interface TaskActionMenuProps {
  item: TaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: TaskItem) => void;
  onDelete: (item: TaskItem) => void;
}
