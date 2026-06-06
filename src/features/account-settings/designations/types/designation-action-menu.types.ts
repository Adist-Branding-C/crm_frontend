import type { DesignationItem } from './designation.types';

export interface DesignationActionMenuProps {
  item: DesignationItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DesignationItem) => void;
  onDelete: (item: DesignationItem) => void;
}
