import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { AgentItem } from '../types/agent.types';

interface AgentActionMenuProps {
  item: AgentItem;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (item: AgentItem) => void;
  onDelete: (item: AgentItem) => void;
}

const AgentActionMenu = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: AgentActionMenuProps) => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.staff_id ? null : item.staff_id ?? null)}>
        <MoreHorizontal size={16} />
      </button>
      {dropdownOpen === item.staff_id && (
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => onEdit(item)}><Edit2 size={14} /> Edit</a>
          <a className="dropdown-item" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</a>
        </div>
      )}
    </div>
  );
};

export default AgentActionMenu;
