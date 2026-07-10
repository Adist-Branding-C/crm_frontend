import { memo } from 'react';
import TaskActions from './TaskActions';
import StatusBadge from '../../../../shared/components/StatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { TaskRowProps } from '../types/index';

const TaskRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.title}</TCell>
    <TCell>{item.category?.name ?? '-'}</TCell>
    <TCell>{item.scheduledDate}</TCell>
    <TCell>{item.assignedTo?.name ?? '-'}</TCell>
    <TCell><StatusBadge value={item.priority} /></TCell>
    <TCell><StatusBadge value={item.status} /></TCell>
    <TCell>{item.lead?.name ?? '-'}</TCell>
    <TCell>
      <TaskActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(TaskRow);
