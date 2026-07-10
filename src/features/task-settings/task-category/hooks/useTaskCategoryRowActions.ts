import { useCallback } from 'react';
import type { TaskCategoryItem, UseTaskCategoryRowActionsParams } from '../types/index';

/**
 * Composes the task-category row actions: opening the edit drawer or the
 * delete-confirm dialog must also close the open row dropdown, in the same user action.
 *
 * Used by:
 * - TaskCategoryPage
 */
export function useTaskCategoryRowActions({ openEditDrawer, onDeleteClick, closeDropdown }: UseTaskCategoryRowActionsParams) {
  const handleEditClick = useCallback((item: TaskCategoryItem) => {
    openEditDrawer(item);
    closeDropdown();
  }, [openEditDrawer, closeDropdown]);

  const handleDeleteClick = useCallback((item: TaskCategoryItem) => {
    onDeleteClick(item);
    closeDropdown();
  }, [onDeleteClick, closeDropdown]);

  return { handleEditClick, handleDeleteClick };
}
