import type { AutomationRule } from './interface';

export interface AutomationRowProps {
  automation: AutomationRule;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (automation: AutomationRule) => void;
  onDelete: (automation: AutomationRule) => void;
  onToggleStatus: (automation: AutomationRule) => void;
}

export interface DeleteAutomationDialogProps {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}
