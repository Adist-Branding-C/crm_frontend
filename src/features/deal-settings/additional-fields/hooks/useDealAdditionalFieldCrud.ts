import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import type { DealAdditionalField } from '../types/interface';
import type { DealAdditionalFieldFormData } from '../types/request';
import type { UseDealAdditionalFieldCrudParams } from '../types/use-deal-additional-field-crud.types';

/**
 * Deal additional-field create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the narrow form/pagination pieces it needs (editingItem, closeDrawer, refresh)
 *   rather than owning or re-exporting the form or pagination hooks themselves -
 *   DealAdditionalFieldPage.tsx owns those hooks directly and reads their full state from there.
 * - Uses FormikHelpers to surface field-level API errors and control form reset,
 *   matching the submit-handler pattern used by the Campaign module.
 * - Try/catch on every API call prevents unhandled network errors from crashing the UI.
 */
export function useDealAdditionalFieldCrud({ editingItem, closeDrawer, refresh, setError }: UseDealAdditionalFieldCrudParams) {
  const handleSubmit = useCallback(async (
    values: DealAdditionalFieldFormData,
    helpers: FormikHelpers<DealAdditionalFieldFormData>,
  ) => {
    const payload = DealAdditionalFieldMapper.toRequest(values);
    try {
      if (editingItem) {
        const response = await dealAdditionalFieldService.updateDealAdditionalField(editingItem.id, payload);
        if (!response.status) {
          helpers.setFieldError('fieldName', response.message || 'Failed to update field');
          return;
        }
      } else {
        const response = await dealAdditionalFieldService.createDealAdditionalField(payload);
        if (!response.status) {
          helpers.setFieldError('fieldName', response.message || 'Failed to add field');
          return;
        }
      }
      helpers.resetForm();
      closeDrawer();
      refresh();
    } catch {
      helpers.setFieldError('fieldName', 'Network error. Please try again.');
    }
  }, [editingItem, closeDrawer, refresh]);

  const handleDelete = useCallback(async (item: DealAdditionalField) => {
    try {
      const response = await dealAdditionalFieldService.deleteDealAdditionalField(item.id);
      if (!response.status) {
        setError(response.message || 'Failed to delete field');
        return false;
      }
      refresh();
      return true;
    } catch {
      setError('Network error. Failed to delete field.');
      return false;
    }
  }, [refresh, setError]);

  return { handleSubmit, handleDelete };
}
