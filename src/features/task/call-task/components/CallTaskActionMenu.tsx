import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import type { CallTaskActionMenuProps } from '../types/call-task-action-menu.types';

const CallTaskActionMenu = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallTaskActionMenuProps) => {
  return (
    <div className="dropdown-container">
      <button
        className="dropdown-toggle"
        onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}
      >
        <MoreHorizontal size={16} />
      </button>
      {dropdownOpen === item.id && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => onEdit(item)}>
            <Edit2 size={14} /> Edit
          </button>
          <button className="dropdown-item" onClick={() => onDelete(item)}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CallTaskActionMenu;
