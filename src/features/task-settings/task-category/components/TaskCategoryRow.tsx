import { memo } from 'react';
import TaskCategoryActions from './TaskCategoryActions';
import CreatedByCell from '../../components/CreatedByCell';
import { TRow, TCell } from '../../../../shared/components/table';
import type { TaskCategoryRowProps } from '../types/index';

/**
 * Renders a single task-category table row; memoized since the list can re-render often while
 * only one row's data actually changes. Purely presentational — click handling is delegated to
 * the parent via onEdit/onDelete/onToggleDropdown.
 */
const TaskCategoryRow = ({ item, index, dropdownOpen, onToggleDropdown, onEdit, onDelete }: TaskCategoryRowProps) => (
  <TRow>
    <TCell>{index + 1}</TCell>
    <TCell>{item.category || '-'}</TCell>
    <CreatedByCell createdByName={item.createdByName} />
    <TCell>{item.status || '-'}</TCell>
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
