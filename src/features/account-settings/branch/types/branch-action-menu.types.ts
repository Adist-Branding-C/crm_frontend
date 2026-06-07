import type { BranchItem } from './branch.types';

export interface BranchActionMenuProps {
  item: BranchItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: BranchItem) => void;
  onDelete: (item: BranchItem) => void;
}
