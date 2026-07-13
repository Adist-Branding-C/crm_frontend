import { memo } from 'react';
import TaskCategoryActions from './TaskCategoryActions';
import { TRow, TCell } from '../../../../shared/components/table';
import type { TaskCategoryRowProps } from '../types/index';

const TaskCategoryRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskCategoryRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.category || '-'}</TCell>
    <TCell>{item.action || '-'}</TCell>
    <TCell>
      <TaskCategoryActions
        item={item}
        dropdownOpen={dropdownOpen}
        onToggleDropdown={onToggleDropdown}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </TCell>
  </TRow>
);

export default memo(TaskCategoryRow);
