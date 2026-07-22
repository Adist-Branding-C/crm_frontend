import { TRow, TCell, RowActionsMenu } from '../../../../shared/components/table';
import type { LeadSourceRowProps } from '../types/lead-source-row.types';

const LeadSourceRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: LeadSourceRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.addedBy}</TCell>
    <TCell className="truncate-cell"><span title={item.source}>{item.source}</span></TCell>
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

export default LeadSourceRow;
