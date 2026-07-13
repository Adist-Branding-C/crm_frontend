import { memo } from 'react';
import { TRow, TCell } from '../../../../shared/components/table';
import RowActions from './RowActions';
import type { TaskItemRowShape, TaskItemRowProps } from '../types/taskItemRow.types';

/**
 * One table row for a task-type entity without a category column
 * (Call Task, Campaign Task, Deal Task all share this exact row shape).
 *
 * Used by:
 * - CallTaskPage, CampaignTaskPage, DealTaskPage.
 *
 * Notes:
 * - Task itself has an extra Category cell, so it uses its own TaskRow instead
 *   of this shared one.
 */
function TaskItemRow<T extends TaskItemRowShape>({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskItemRowProps<T>) {
  return (
    <TRow>
      <TCell>{index}</TCell>
      <TCell>{item.title}</TCell>
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
}

export default memo(TaskItemRow) as typeof TaskItemRow;
