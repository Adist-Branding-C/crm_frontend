import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { TaskCategoryFormData, UseTaskCategoryFormSubmitParams } from '../types/index';

/**
 * Add/edit submit orchestration for the task-category drawer: dispatches to add or update, skips
 * the update call when the form is unchanged, and closes the relevant drawer on success.
 */
export function useTaskCategoryFormSubmit({
  editingItem,
  closeAddDrawer,
  closeEditDrawer,
  handleAddTaskCategory,
  handleUpdateTaskCategory,
}: UseTaskCategoryFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: TaskCategoryFormData,
    helpers: FormikHelpers<TaskCategoryFormData>,
  ) => {
    const success = await handleAddTaskCategory(values, helpers);
    if (success) closeAddDrawer();
  }, [handleAddTaskCategory, closeAddDrawer]);

  const handleEditSubmit = useCallback(async (
    values: TaskCategoryFormData,
    helpers: FormikHelpers<TaskCategoryFormData>,
  ) => {
    if (!editingItem) return;
    const original: TaskCategoryFormData = {
      category: editingItem.category || '',
      action: editingItem.action || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateTaskCategory(editingItem.id, values, helpers);
    if (success) closeEditDrawer();
  }, [editingItem, handleUpdateTaskCategory, closeEditDrawer]);

  return { handleSubmit, handleEditSubmit };
}
