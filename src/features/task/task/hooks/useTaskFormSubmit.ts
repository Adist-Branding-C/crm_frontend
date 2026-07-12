import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { TaskMapper } from '../mappers/task.mapper';
import type { TaskFormData } from '../types';
import type { UseTaskFormSubmitParams } from '../types';

export function useTaskFormSubmit({ editingItem, closeDrawer, handleAddTask, handleUpdateTask }: UseTaskFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: TaskFormData,
    helpers: FormikHelpers<TaskFormData>,
  ) => {
    const success = await handleAddTask(values, helpers);
    if (success) closeDrawer();
  }, [handleAddTask, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: TaskFormData,
    helpers: FormikHelpers<TaskFormData>,
  ) => {
    if (!editingItem) return;
    const original = TaskMapper.toFormValues(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateTask(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateTask, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
