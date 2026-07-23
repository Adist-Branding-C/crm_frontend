import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { TaskCategoryItem } from '../types/index';

/**
 * Thin wrapper around the shared useDeleteConfirmation, scoped to task-category items.
 */
export function useTaskCategoryDeleteConfirm(handleDeleteTaskCategory: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<TaskCategoryItem>((item) => handleDeleteTaskCategory(item.id));
}
