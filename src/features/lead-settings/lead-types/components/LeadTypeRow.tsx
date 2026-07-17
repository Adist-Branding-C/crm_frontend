import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { LeadTypeRowProps } from '../types/lead-type-row.types';

const LeadTypeRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: LeadTypeRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.addedBy}</TCell>
    <TCell>{item.type}</TCell>
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

export default LeadTypeRow;
