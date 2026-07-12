import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import type { TaskCategoryItem } from '../types/index';

/**
 * Delete-confirmation modal state for task categories.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation.
 */
export function useTaskCategoryDeleteConfirm(handleDeleteTaskCategory: (id: number) => Promise<boolean>) {
  return useDeleteConfirmation<TaskCategoryItem>((item) => handleDeleteTaskCategory(item.id));
}
