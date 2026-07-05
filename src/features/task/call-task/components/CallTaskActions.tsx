import { useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../shared/components/ActionMenuPortal';
import type { CallTaskActionsProps } from '../types/index';

const CallTaskActions = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallTaskActionsProps) => {
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

export default CallTaskActions;
