export interface RowActionsProps<T extends { id: number }> {
  item: T;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
