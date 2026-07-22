import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { mapItemToFormData } from '../mappers/leadSource.mapper';
import type { LeadSourceFormData } from '../types/interface';
import type { UseLeadSourceFormSubmitParams } from '../types/use-lead-source-form-submit.types';

/**
 * Add/edit submit orchestration for the lead-source drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useLeadSourceFormSubmit({ editingItem, closeDrawer, handleCreateLeadSource, handleUpdateLeadSource }: UseLeadSourceFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: LeadSourceFormData,
    helpers: FormikHelpers<LeadSourceFormData>,
  ) => {
    const success = await handleCreateLeadSource(values, helpers);
    if (success) closeDrawer();
  }, [handleCreateLeadSource, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: LeadSourceFormData,
    helpers: FormikHelpers<LeadSourceFormData>,
  ) => {
    if (!editingItem) return;
    const original = mapItemToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateLeadSource(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateLeadSource, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
