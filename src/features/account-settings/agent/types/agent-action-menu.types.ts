import type { AgentItem } from './agent.types';

export interface AgentActionMenuProps {
  item: AgentItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}
