import { memo } from 'react';
import { TRow, TCell } from '../../../../shared/components/table';
import RowActions from '../../shared/components/RowActions';
import type { TaskRowProps } from '../types';

const TaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskRowProps) => (
  <TRow>
    <TCell>{index}</TCell>
    <TCell>{item.title}</TCell>
    <TCell>{item.category?.name ?? '-'}</TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell><span className={`status-badge status-${(item.priority || '').toLowerCase()}`}>{item.priority || '-'}</span></TCell>
    <TCell><span className={`status-badge status-${(item.status || '').toLowerCase()}`}>{item.status}</span></TCell>
    <TCell>{item.lead?.name ?? '-'}</TCell>
    <TCell>
      <RowActions item={item} dropdownOpen={dropdownOpen} onToggleDropdown={onToggleDropdown} onEdit={onEdit} onDelete={onDelete} />
    </TCell>
  </TRow>
);

export default memo(TaskRow);
