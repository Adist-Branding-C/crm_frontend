import { useMemo } from 'react';
import type { TaskCategoryItem, TaskCategoryFormData } from '../types/index';
import { ADD_TASK_CATEGORY_INITIAL_VALUES } from '../constants/index';

/**
 * Derives the Formik initial values for the edit drawer from the item being edited, falling back
 * to empty strings for a missing category/status. Memoized on editingItem so the add drawer's
 * blank initial values aren't recomputed on every render.
 */
export function useTaskCategoryForm(editingItem: TaskCategoryItem | null) {
  const editInitialValues: TaskCategoryFormData = useMemo(
    () => editingItem
      ? { category: editingItem.category || '', status: editingItem.status || '' }
      : ADD_TASK_CATEGORY_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
