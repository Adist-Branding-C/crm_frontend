import { memo, useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionMenuPortal from '../../../../shared/components/ActionMenuPortal';
import type { CallStatusActionsProps } from '../types/index';

/**
 * Renders the row's kebab-menu trigger and the edit/delete actions inside a portal, so the menu
 * can float above the table instead of being clipped by an overflow:hidden ancestor. Open/close
 * state is fully controlled by the parent (dropdownOpen/onToggleDropdown), not owned locally.
 */
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
