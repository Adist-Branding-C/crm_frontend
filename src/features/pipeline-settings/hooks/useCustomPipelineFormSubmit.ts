import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { mapItemToFormData } from '../mappers/customPipeline.mapper';
import type { CustomPipelineFormData } from '../types/interface';
import type { UseCustomPipelineFormSubmitParams } from '../types/use-custom-pipeline-form-submit.types';

/**
 * Add/edit submit orchestration for the custom-pipeline drawer: dispatches to create or update,
 * skips the update call when the form is unchanged, and closes the drawer on success.
 */
export function useCustomPipelineFormSubmit({ editingItem, closeDrawer, handleCreateCustomPipeline, handleUpdateCustomPipeline }: UseCustomPipelineFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CustomPipelineFormData,
    helpers: FormikHelpers<CustomPipelineFormData>,
  ) => {
    const success = await handleCreateCustomPipeline(values, helpers);
    if (success) closeDrawer();
  }, [handleCreateCustomPipeline, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CustomPipelineFormData,
    helpers: FormikHelpers<CustomPipelineFormData>,
  ) => {
    if (!editingItem) return;
    const original = mapItemToFormData(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCustomPipeline(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateCustomPipeline, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
