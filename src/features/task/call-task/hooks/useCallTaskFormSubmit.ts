import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { CallTaskMapper } from '../mappers/callTask.mapper';
import type { CallTaskFormData } from '../types/index';
import type { UseCallTaskFormSubmitParams } from '../types/useCallTaskFormSubmit.types';

export function useCallTaskFormSubmit({ editingItem, closeDrawer, handleAddCallTask, handleUpdateCallTask }: UseCallTaskFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CallTaskFormData,
    helpers: FormikHelpers<CallTaskFormData>,
  ) => {
    const success = await handleAddCallTask(values, helpers);
    if (success) closeDrawer();
  }, [handleAddCallTask, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CallTaskFormData,
    helpers: FormikHelpers<CallTaskFormData>,
  ) => {
    if (!editingItem) return;
    const original = CallTaskMapper.toFormValues(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCallTask(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateCallTask, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
