import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { mapItemToFormData } from '../mappers/leadPurpose.mapper';
import type { LeadPurposeFormData } from '../types/interface';
import type { UseLeadPurposeFormSubmitParams } from '../types/use-lead-purpose-form-submit.types';

/**
 * Add/edit submit orchestration for the lead-purpose drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useLeadPurposeFormSubmit({ editingItem, closeDrawer, handleCreateLeadPurpose, handleUpdateLeadPurpose }: UseLeadPurposeFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: LeadPurposeFormData,
    helpers: FormikHelpers<LeadPurposeFormData>,
  ) => {
    const success = await handleCreateLeadPurpose(values, helpers);
    if (success) closeDrawer();
  }, [handleCreateLeadPurpose, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: LeadPurposeFormData,
    helpers: FormikHelpers<LeadPurposeFormData>,
  ) => {
    if (!editingItem) return;
    const original = mapItemToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateLeadPurpose(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateLeadPurpose, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
