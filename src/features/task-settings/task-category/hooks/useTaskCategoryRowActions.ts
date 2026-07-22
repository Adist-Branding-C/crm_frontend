import { useRowActions } from '../../../../shared/hooks/useRowActions';
import type { TaskCategoryItem, UseTaskCategoryRowActionsParams } from '../types/index';

/**
 * Composes the task-category row actions: opening the edit drawer or the delete-confirm dialog
 * must also close the open row dropdown, in the same user action. Delegates the actual
 * composition to the shared, entity-generic useRowActions hook.
 */
export function useTaskCategoryRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseTaskCategoryRowActionsParams) {
  return useRowActions<TaskCategoryItem>({ onEdit: openEditDrawer, onDelete: onDeleteClick, closeDropdown });
}
