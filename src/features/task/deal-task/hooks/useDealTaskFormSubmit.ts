import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { DealTaskMapper } from '../mappers/dealTask.mapper';
import type { DealTaskFormData } from '../types/index';
import type { UseDealTaskFormSubmitParams } from '../types/useDealTaskFormSubmit.types';

export function useDealTaskFormSubmit({ editingItem, closeDrawer, handleAddDealTask, handleUpdateDealTask }: UseDealTaskFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: DealTaskFormData,
    helpers: FormikHelpers<DealTaskFormData>,
  ) => {
    const success = await handleAddDealTask(values, helpers);
    if (success) closeDrawer();
  }, [handleAddDealTask, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: DealTaskFormData,
    helpers: FormikHelpers<DealTaskFormData>,
  ) => {
    if (!editingItem) return;
    const original = DealTaskMapper.toFormValues(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateDealTask(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateDealTask, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
