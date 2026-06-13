import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';

interface TableActionsProps<T extends { id: number }> {
  item: T;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

const TableActions = <T extends { id: number }>({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TableActionsProps<T>) => (
  <div className="action-menu-container" style={{ position: 'relative' }}>
    <button
      className={`action-btn ${dropdownOpen === item.id ? 'active' : ''}`}
      onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}
    >
      <MoreHorizontal size={16} />
    </button>
    {dropdownOpen === item.id && (
      <div className="premium-dropdown action-dropdown">
        <button className="dropdown-item" onClick={() => { onEdit(item); onToggleDropdown(null); }}>
          <Edit2 size={14} /> {ACTION_EDIT}
        </button>
        <button className="dropdown-item danger" onClick={() => { onDelete(item); onToggleDropdown(null); }}>
          <Trash2 size={14} /> {ACTION_DELETE}
        </button>
      </div>
    )}
  </div>
);

export default TableActions;
