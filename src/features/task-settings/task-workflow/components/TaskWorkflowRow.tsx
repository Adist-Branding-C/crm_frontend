import { memo } from 'react';
import TaskWorkflowActions from './TaskWorkflowActions';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import { TRow, TCell } from '../../../../shared/components/table';
import type { TaskWorkflowRowProps } from '../types/index';

const TaskWorkflowRow = ({ item, index, dropdownOpen, onToggleDropdown, onOpen, onSetDefault, onDelete }: TaskWorkflowRowProps) => (
  <TRow style={{ cursor: 'pointer' }} onClick={() => onOpen(item)}>
    <TCell>{index + 1}</TCell>
    <TCell>{item.name || '-'}</TCell>
    <TCell>{item.stages?.length ?? 0}</TCell>
    <TCell>
      <SettingsStatusBadge status={item.isActive ? 'Active' : 'Inactive'} />
    </TCell>
    <TCell onClick={(e) => e.stopPropagation()}>
      <TaskWorkflowActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onOpen={onOpen}
        onSetDefault={onSetDefault}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(TaskWorkflowRow);
