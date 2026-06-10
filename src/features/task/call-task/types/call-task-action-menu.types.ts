import type { CallTaskItem } from './callTask.types';

export interface CallTaskActionMenuProps {
  item: CallTaskItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CallTaskItem) => void;
  onDelete: (item: CallTaskItem) => void;
}
