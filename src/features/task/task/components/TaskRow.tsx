import { memo } from 'react';
import { TRow, TCell } from '../../../../shared/components/table';
import StatusBadge from '../../../../shared/components/StatusBadge';
import RowActions from '../../common/components/RowActions';
import { formatTime12hr } from '../../../../shared/utils/dateUtils';
import type { TaskRowProps } from '../types/component.types';

const TaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskRowProps) => (
  <TRow>
    <TCell>{index}</TCell>
    <TCell>{item.title}</TCell>
    <TCell className="truncate-cell"><span title={item.description}>{item.description}</span></TCell>
    <TCell>{item.category?.name ?? '-'}</TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{formatTime12hr(item.scheduledTime)}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell>{item.assignedBy?.name ?? '-'}</TCell>
    <TCell><StatusBadge value={item.priority} /></TCell>
    <TCell><StatusBadge value={item.status} /></TCell>
    <TCell>{item.leadId?.name ?? '-'}</TCell>
    <TCell>
      <RowActions item={item} dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown} onEdit={onEdit} onDelete={onDelete} />
    </TCell>
  </TRow>
);

export default memo(TaskRow);
