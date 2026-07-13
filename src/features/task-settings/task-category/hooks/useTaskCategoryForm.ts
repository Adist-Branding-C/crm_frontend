import { useMemo } from 'react';
import type { TaskCategoryItem, TaskCategoryFormData } from '../types/index';
import { ADD_TASK_CATEGORY_INITIAL_VALUES } from '../constants/index';

export function useTaskCategoryForm(editingItem: TaskCategoryItem | null) {
  const editInitialValues: TaskCategoryFormData = useMemo(
    () => editingItem
      ? { category: editingItem.category || '', action: editingItem.action || '' }
      : ADD_TASK_CATEGORY_INITIAL_VALUES,
    [editingItem],
  );

  return { editInitialValues };
}
