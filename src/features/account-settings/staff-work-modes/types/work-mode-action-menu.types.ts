import type { WorkModeItem } from './workMode.types';

export interface WorkModeActionMenuProps {
  item: WorkModeItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WorkModeItem) => void;
  onDelete: (item: WorkModeItem) => void;
}
