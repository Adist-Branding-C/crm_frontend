import type { DepartmentItem } from './department.types';

export interface DepartmentActionMenuProps {
  item: DepartmentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DepartmentItem) => void;
  onDelete: (item: DepartmentItem) => void;
}
