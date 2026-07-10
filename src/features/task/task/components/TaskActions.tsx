import { useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../../task-settings/components/ActionMenuPortal';
import type { TaskActionsProps } from '../types/index';

const TaskActions = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskActionsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="dropdown-container">
      <button ref={buttonRef} className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      <ActionMenuPortal isOpen={dropdownOpen === item.id} triggerRef={buttonRef} onClose={() => onToggleDropdown(null)}>
        <button onClick={() => { onEdit(item); onToggleDropdown(null); }}>
          <Edit2 size={14} /> Edit
        </button>
        <button className="delete" onClick={() => { onDelete(item); onToggleDropdown(null); }}>
          <Trash2 size={14} /> Delete
        </button>
      </ActionMenuPortal>
    </div>
  );
};

export default TaskActions;
