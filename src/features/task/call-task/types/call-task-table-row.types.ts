import type { CallTaskItem } from './callTask.types';

export interface CallTaskTableRowProps {
  item: CallTaskItem;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallTaskItem) => void;
  onDelete: (item: CallTaskItem) => void;
}
