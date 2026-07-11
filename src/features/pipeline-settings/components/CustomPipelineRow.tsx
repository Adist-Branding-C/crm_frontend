import { TRow, TCell, RowActionsMenu } from '../../../shared/components/table';
import { entityTypeLabel, groupByFieldLabel } from '../utils/customPipelineLabels.util';
import type { CustomPipelineRowProps } from '../types/custom-pipeline-row.types';

const CustomPipelineRow = ({ item, index, isMenuOpen, onToggleMenu, onEdit, onDelete }: CustomPipelineRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name}</TCell>
    <TCell>{entityTypeLabel(item.entityType)}</TCell>
    <TCell>{groupByFieldLabel(item.groupByField)}</TCell>
    <TCell>
      <span className={`badge ${item.isActive ? 'badge-success' : 'badge-secondary'}`}>
        {item.isActive ? 'Active' : 'Inactive'}
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

export default CustomPipelineRow;
