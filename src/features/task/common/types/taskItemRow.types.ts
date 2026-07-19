export interface TaskItemRowShape {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo?: { name: string } | null;
  assignedBy?: { name: string } | null;
  priority: string;
  status: string;
  leadId?: { id: number; name: string } | null;
}

export interface TaskItemRowProps<T extends TaskItemRowShape> {
  item: T;
  index: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
