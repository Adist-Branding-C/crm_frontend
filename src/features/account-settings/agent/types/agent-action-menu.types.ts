import type { AgentItem } from './agent.types';

export interface AgentActionMenuProps {
  item: AgentItem;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}
