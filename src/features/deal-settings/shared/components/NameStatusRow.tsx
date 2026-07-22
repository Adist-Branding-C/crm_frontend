import { memo, useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { TRow, TCell } from '../../../../shared/components/table';
import ActionMenuPortal from '../../../task-settings/components/ActionMenuPortal';
import { ACTION_EDIT, ACTION_DELETE } from '../../../../shared/constants/actionLabels';

interface NameStatusItem {
  id: number;
  name?: string;
  status: boolean;
}

interface NameStatusRowProps<T extends NameStatusItem> {
  item: T;
  index: number;
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

/**
 * Generic table row for any {id, name, status} entity with an edit/delete action menu.
 *
 * Notes:
 * - Reusable across deal-settings sub-features (status, type) that share this exact entity
 *   shape and row layout; previously duplicated 1:1 as DealStatusRow/DealTypeRow.
 */
function NameStatusRow<T extends NameStatusItem>({ item, index, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete }: NameStatusRowProps<T>) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <TRow>
      <TCell>{startIndex + index + 1}</TCell>
      <TCell>{item.name}</TCell>
      <TCell>
        <span className={'status-badge status-' + (item.status ? 'active' : 'inactive')}>
          {item.status ? 'Active' : 'Inactive'}
        </span>
      </TCell>
      <TCell>
        <div className="dropdown-container">
          <button
            ref={buttonRef}
            className="dropdown-toggle"
            onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}
          >
            <MoreHorizontal size={16} />
          </button>
          <ActionMenuPortal
            isOpen={dropdownOpen === item.id}
            triggerRef={buttonRef}
            onClose={() => onToggleDropdown(null)}
          >
            <button onClick={() => { onEdit(item); onToggleDropdown(null); }}>
              <Edit2 size={14} />{ACTION_EDIT}
            </button>
            <button className="delete" onClick={() => { onDelete(item); onToggleDropdown(null); }}>
              <Trash2 size={14} />{ACTION_DELETE}
            </button>
          </ActionMenuPortal>
        </div>
      </TCell>
    </TRow>
  );
}

export default memo(NameStatusRow) as typeof NameStatusRow;
