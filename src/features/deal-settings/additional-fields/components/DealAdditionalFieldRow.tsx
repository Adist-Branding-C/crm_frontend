import { memo, useRef } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { TRow, TCell } from '../../../../shared/components/table';
import ActionMenuPortal from '../../../task-settings/components/ActionMenuPortal';
import { ACTION_EDIT, ACTION_DELETE } from '../../../../shared/constants/actionLabels';
import type { DealAdditionalField } from '../types/interface';

interface DealAdditionalFieldRowProps {
  item: DealAdditionalField;
  index: number;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (item: DealAdditionalField) => void;
  onDelete: (item: DealAdditionalField) => void;
}

const DealAdditionalFieldRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: DealAdditionalFieldRowProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownId = `add_${item.id}`;

  return (
    <TRow>
      <TCell>{index + 1}</TCell>
      <TCell>{item.field}</TCell>
      <TCell>{item.type}</TCell>
      <TCell>
        <span className={`badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`}>
          {item.inFilter ? 'YES' : 'NO'}
        </span>
      </TCell>
      <TCell>
        <span className={`badge ${item.inList ? 'badge-success' : 'badge-secondary'}`}>
          {item.inList ? 'YES' : 'NO'}
        </span>
      </TCell>
      <TCell>
        <span className={`badge ${item.required ? 'badge-success' : 'badge-secondary'}`}>
          {item.required ? 'YES' : 'NO'}
        </span>
      </TCell>
      <TCell>
        <div className="dropdown-container">
          <button
            ref={buttonRef}
            className="dropdown-toggle"
            onClick={() => onToggleDropdown(dropdownOpen === dropdownId ? null : dropdownId)}
          >
            <MoreHorizontal size={16} />
          </button>
          <ActionMenuPortal
            isOpen={dropdownOpen === dropdownId}
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
};

export default memo(DealAdditionalFieldRow);
