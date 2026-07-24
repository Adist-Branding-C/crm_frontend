import { memo } from 'react';
import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { DealAdditionalFieldRowProps } from '../types/deal-additional-field-row.types';

const DealAdditionalFieldRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: DealAdditionalFieldRowProps) => {
  return (
    <TRow>
      <TCell>{index + 1}</TCell>
      <TCell>{item.addedBy}</TCell>
      <TCell>{item.field}</TCell>
      <TCell>{item.type}</TCell>
      <TCell>
        <span>{item.dropdownValues.length > 0 ? item.dropdownValues.join(', ') : '-'}</span>
      </TCell>
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
        <RowActionsMenu
          isOpen={isMenuOpen}
          onToggle={onToggleMenu}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      </TCell>
    </TRow>
  );
};

export default memo(DealAdditionalFieldRow);
