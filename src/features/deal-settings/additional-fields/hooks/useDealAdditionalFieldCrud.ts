import { useCallback, useRef, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import { getErrorMessage } from '../../../../shared/utils/error';
import type { DealAdditionalField } from '../types/interface';
import type { DealAdditionalFieldFormData } from '../types/request';
import type { UseDealAdditionalFieldCrudParams } from '../types/use-deal-additional-field-crud.types';

interface PendingSave {
  values: DealAdditionalFieldFormData;
  helpers: FormikHelpers<DealAdditionalFieldFormData>;
}

/**
 * Create/update/delete orchestration for one DealAdditionalField, including the confirm-before-save
 * modal gating create/update.
 *
 * Notes:
 * - The confirm-modal state (showSaveConfirm/saveConfirmMode) is deliberately kept in this same hook
 *   rather than split into its own hook: it exists only to gate the pending Formik values for this one
 *   create/update call, so the pending payload and the submission it confirms must stay in lockstep.
 *   Splitting them would just require threading the pending values through an extra hook for no
 *   separation-of-concerns benefit.
 */
export function useDealAdditionalFieldCrud({ editingItem, closeDrawer, refresh, setError, showToastMessage }: UseDealAdditionalFieldCrudParams) {
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveConfirmMode, setSaveConfirmMode] = useState<'create' | 'update'>('create');
  const [isSaving, setIsSaving] = useState(false);
  const pendingRef = useRef<PendingSave | null>(null);

  const requestSave = useCallback((values: DealAdditionalFieldFormData, helpers: FormikHelpers<DealAdditionalFieldFormData>) => {
    pendingRef.current = { values, helpers };
    setSaveConfirmMode(editingItem ? 'update' : 'create');
    setShowSaveConfirm(true);
  }, [editingItem]);

  const cancelSave = useCallback(() => {
    pendingRef.current?.helpers.setSubmitting(false);
    pendingRef.current = null;
    setShowSaveConfirm(false);
  }, []);

  const confirmSave = useCallback(async () => {
    const pending = pendingRef.current;
    if (!pending) return;

    setShowSaveConfirm(false);
    setIsSaving(true);
    setError('');

    try {
      const payload = DealAdditionalFieldMapper.toRequest(pending.values);
      const response = editingItem
        ? await dealAdditionalFieldService.updateDealAdditionalField(editingItem.id, payload)
        : await dealAdditionalFieldService.createDealAdditionalField(payload);

      if (!response.status) {
        const message = response.message || (editingItem ? 'Failed to update field' : 'Failed to add field');
        setError(message);
        showToastMessage(message, 'error');
        return;
      }

      closeDrawer();
      refresh();
      pending.helpers.resetForm();
      showToastMessage(
        editingItem ? 'Additional field updated successfully' : 'Additional field added successfully',
        'success',
      );
    } catch (err) {
      const message = getErrorMessage(err, 'Network error. Please try again.');
      setError(message);
      showToastMessage(message, 'error');
    } finally {
      pending.helpers.setSubmitting(false);
      setIsSaving(false);
      pendingRef.current = null;
    }
  }, [editingItem, closeDrawer, refresh, setError, showToastMessage]);

  const handleDelete = useCallback(async (item: DealAdditionalField) => {
    try {
      const response = await dealAdditionalFieldService.deleteDealAdditionalField(item.id);
      if (!response.status) {
        const message = response.message || 'Failed to delete field';
        setError(message);
        showToastMessage(message, 'error');
        return false;
      }
      refresh();
      showToastMessage('Additional field deleted successfully', 'success');
      return true;
    } catch (err) {
      const message = getErrorMessage(err, 'Network error. Failed to delete field.');
      setError(message);
      showToastMessage(message, 'error');
      return false;
    }
  }, [refresh, setError, showToastMessage]);

  return { showSaveConfirm, saveConfirmMode, isSaving, requestSave, confirmSave, cancelSave, handleDelete };
}
