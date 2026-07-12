import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { CallStatusFormData, UseCallStatusFormSubmitParams } from '../types/index';

/**
 * Add/edit submit orchestration for the call-status drawer: dispatches to add or update, skips
 * the update call when the form is unchanged, and closes the relevant drawer on success.
 */
export function useCallStatusFormSubmit({
  editingItem,
  closeAddDrawer,
  closeEditDrawer,
  handleAddCallStatus,
  handleUpdateCallStatus,
}: UseCallStatusFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CallStatusFormData,
    helpers: FormikHelpers<CallStatusFormData>,
  ) => {
    const success = await handleAddCallStatus(values, helpers);
    if (success) closeAddDrawer();
  }, [handleAddCallStatus, closeAddDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CallStatusFormData,
    helpers: FormikHelpers<CallStatusFormData>,
  ) => {
    if (!editingItem) return;
    const original: CallStatusFormData = {
      name: editingItem.name || '',
      status: editingItem.status || 'Active',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCallStatus(editingItem.id, values, helpers);
    if (success) closeEditDrawer();
  }, [editingItem, handleUpdateCallStatus, closeEditDrawer]);

  return { handleSubmit, handleEditSubmit };
}
