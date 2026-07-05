import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { WorkModeActionMenuProps } from '../types';

const WorkModeActionMenu = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: WorkModeActionMenuProps) => {
  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      {dropdownOpen === item.id && (
        <div className="dropdown-menu">
          <a className="dropdown-item" onClick={() => onEdit(item)}><Edit2 size={14} /> Edit</a>
          <a className="dropdown-item" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</a>
        </div>
      )}
    </div>
  );
};

export default WorkModeActionMenu;
