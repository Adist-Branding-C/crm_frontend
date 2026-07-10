import { memo, useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../components/ActionMenuPortal';
import type { CallStatusActionsProps } from '../types/index';

const CallStatusActions = ({ item, dropdownOpen, onToggleDropdown, onEdit, onDelete }: CallStatusActionsProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="dropdown-container">
      <button ref={buttonRef} className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}>
        <MoreHorizontal size={16} />
      </button>
      <ActionMenuPortal
        isOpen={dropdownOpen === item.id}
        triggerRef={buttonRef}
        onClose={() => onToggleDropdown(null)}
      >
        <button onClick={() => onEdit(item)}><Edit2 size={14} /> Edit</button>
        <button className="delete" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</button>
      </ActionMenuPortal>
    </div>
  );
};

export default memo(CallStatusActions);
