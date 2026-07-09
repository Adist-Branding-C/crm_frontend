import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { LeadPurposeRowProps } from '../types/lead-purpose-row.types';

const LeadPurposeRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: LeadPurposeRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.title}</TCell>
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

export default LeadPurposeRow;
