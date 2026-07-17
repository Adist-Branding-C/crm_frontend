import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import type { CallReasonFormData, UseCallReasonFormSubmitParams } from '../types/index';

/**
 * Add/edit submit orchestration for the call-reason drawer: dispatches to add or update, skips
 * the update call when the form is unchanged, and closes the relevant drawer on success.
 */
export function useCallReasonFormSubmit({
  editingItem,
  closeAddDrawer,
  closeEditDrawer,
  handleAddCallReason,
  handleUpdateCallReason,
}: UseCallReasonFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CallReasonFormData,
    helpers: FormikHelpers<CallReasonFormData>,
  ) => {
    const success = await handleAddCallReason(values, helpers);
    if (success) closeAddDrawer();
  }, [handleAddCallReason, closeAddDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CallReasonFormData,
    helpers: FormikHelpers<CallReasonFormData>,
  ) => {
    if (!editingItem) return;
    const original: CallReasonFormData = {
      name: editingItem.name || '',
      status: editingItem.status || 'Active',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCallReason(editingItem.id, values, helpers);
    if (success) closeEditDrawer();
  }, [editingItem, handleUpdateCallReason, closeEditDrawer]);

  return { handleSubmit, handleEditSubmit };
}
