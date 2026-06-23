import type { DealTaskItem } from './dealTask.types';

export interface DealTaskActionMenuProps {
  item: DealTaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
}
