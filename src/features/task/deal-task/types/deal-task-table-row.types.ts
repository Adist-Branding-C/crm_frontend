import type { DealTaskItem } from './dealTask.types';

export interface DealTaskTableRowProps {
  item: DealTaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealTaskItem) => void;
  onDelete: (item: DealTaskItem) => void;
}
