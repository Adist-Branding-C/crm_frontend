import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { mapItemToFormData } from '../mappers/additionalField.mapper';
import type { AdditionalFieldFormData } from '../types/interface';
import type { UseLeadAdditionalFormSubmitParams } from '../types/use-lead-additional-form-submit.types';

/**
 * Add/edit submit orchestration for the lead-additional form panel: dispatches to create or
 * update based on whether an item is being edited, skips the update call when the form is
 * unchanged, and resets the form (back to "add" mode) on success.
 */
export function useLeadAdditionalFormSubmit({ editingItem, closeDrawer, handleCreateAdditionalField, handleUpdateAdditionalField }: UseLeadAdditionalFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: AdditionalFieldFormData,
    helpers: FormikHelpers<AdditionalFieldFormData>,
  ) => {
    const success = await handleCreateAdditionalField(values, helpers);
    if (success) closeDrawer();
  }, [handleCreateAdditionalField, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: AdditionalFieldFormData,
    helpers: FormikHelpers<AdditionalFieldFormData>,
  ) => {
    if (!editingItem) return;
    const original = mapItemToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateAdditionalField(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateAdditionalField, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
