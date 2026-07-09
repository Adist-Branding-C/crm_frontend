import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { LeadStatusRowProps } from '../types/lead-status-row.types';

const LeadStatusRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: LeadStatusRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.status}</TCell>
    <TCell><span className="color-pill" style={{ background: item.color }} /></TCell>
    <TCell>
      <span className={`badge ${item.useForConversion ? 'badge-success' : 'badge-secondary'}`}>
        {item.useForConversion ? 'Yes' : 'No'}
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

export default LeadStatusRow;
