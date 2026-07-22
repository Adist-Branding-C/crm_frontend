import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { AdditionalFieldRowProps } from '../types/additional-field-row.types';

const AdditionalFieldRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: AdditionalFieldRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.addedBy}</TCell>
    <TCell>{item.field}</TCell>
    <TCell>{item.type}</TCell>
    <TCell>{item.dropdownValues.length > 0 ? item.dropdownValues.join(', ') : '-'}</TCell>
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
    <TCell>{item.purposeName}</TCell>
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

export default AdditionalFieldRow;
