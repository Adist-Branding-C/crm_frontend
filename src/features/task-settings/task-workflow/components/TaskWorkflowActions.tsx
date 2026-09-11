import { memo, useRef } from 'react';
import { MoreHorizontal, Eye, Star, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../../../shared/components/ActionMenuPortal';
import type { TaskWorkflowActionsProps } from '../types/index';

const TaskWorkflowActions = ({ item, dropdownOpen, onToggleDropdown, onOpen, onSetDefault, onDelete }: TaskWorkflowActionsProps) => {
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
        <button onClick={() => onOpen(item)}><Eye size={14} /> Open</button>
        {!item.isDefault && (
          <button onClick={() => onSetDefault(item)}><Star size={14} /> Set as Default</button>
        )}
        {!item.isDefault && (
          <button className="delete" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</button>
        )}
      </ActionMenuPortal>
    </div>
  );
};

export default memo(TaskWorkflowActions);
