import { memo, useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { TRow, TCell } from '../../../../shared/components/table';
import ActionMenuPortal from '../../../task-settings/components/ActionMenuPortal';
import { ACTION_EDIT, ACTION_DELETE } from '../../../../shared/constants/actionLabels';
import type { DealStatusItem } from '../types/interface';

interface DealStatusRowProps {
  item: DealStatusItem;
  index: number;
  startIndex: number;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: DealStatusItem) => void;
  onDelete: (item: DealStatusItem) => void;
}

/**
 * Table row for deal-status entities, extending the base name+status layout with a Stage column.
 *
 * Notes:
 * - Separate from the shared NameStatusRow because deal statuses carry an extra `stage` field
 *   that deal types do not share.
 */
function DealStatusRow({ item, index, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete }: DealStatusRowProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <TRow>
      <TCell>{startIndex + index + 1}</TCell>
      <TCell>{item.name}</TCell>
      <TCell>{item.stage === 'WIN' ? 'Win' : item.stage === 'LOSE' ? 'Lose' : item.stage === 'IN_PROGRESS' ? 'In Progress' : item.stage || '-'}</TCell>
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

export default memo(DealStatusRow);
