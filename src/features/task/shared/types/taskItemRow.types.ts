export interface TaskItemRowShape {
  id: number;
  title: string;
  scheduledDate: string;
  assignedTo?: { name: string } | null;
  priority: string;
  status: string;
  leadId?: { name: string } | null;
}

export interface TaskItemRowProps<T extends TaskItemRowShape> {
  item: T;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
