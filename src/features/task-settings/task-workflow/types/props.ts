import type { TaskWorkflowItem } from './interface';

export interface TaskWorkflowRowProps {
  item: TaskWorkflowItem;
  index: number;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onOpen: (item: TaskWorkflowItem) => void;
  onSetDefault: (item: TaskWorkflowItem) => void;
  onDelete: (item: TaskWorkflowItem) => void;
}

export interface TaskWorkflowActionsProps {
  item: TaskWorkflowItem;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onOpen: (item: TaskWorkflowItem) => void;
  onSetDefault: (item: TaskWorkflowItem) => void;
  onDelete: (item: TaskWorkflowItem) => void;
}
