import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { leadAdditionalService } from '../services/leadAdditionalService';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { getErrorMessage } from '../../../../shared/utils/error';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_ADDITIONAL_FIELD_MAP, LEAD_ADDITIONAL_FIELD_ERROR_FALLBACKS } from '../constants';
import { FIELD_TYPES } from '../constants/fieldTypes';
import type { AdditionalFieldFormData } from '../types/interface';
import type { UseLeadAdditionalCrudParams } from '../types/use-lead-additional-crud.types';

/**
 * Lead additional-field create/update/delete API orchestration.
 *
 * Notes:
 * - Owns its own isSaving/error state rather than sharing the table's fetch-loading/error state -
 *   this error is form-panel-scoped (create/update failures), separate from the table's own fetch
 *   errors, and isSaving drives the form's submit-button spinner.
 * - deleteError is kept separate from error: the former renders inside the delete confirmation
 *   modal, the latter inside the Add/Edit form panel - sharing one state was leaking delete
 *   failures into the unrelated Add/Edit form's error banner.
 * - Uses the shared useSubmitErrorHandler with a custom containerSelector ('.additional-form-panel')
 *   since this page has no drawer - the form is an always-visible panel, not inside '.drawer-body'.
 * - Takes only the narrow pagination setters it needs (reset-to-page-1, refresh) rather than
 *   owning or re-exporting the pagination hook itself - LeadAdditionalPage.tsx owns useTableData
 *   directly and reads its full state from there.
 */
export function useLeadAdditionalCrud({ table }: UseLeadAdditionalCrudParams) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const submitError = useSubmitErrorHandler({
    fieldMap: LEAD_ADDITIONAL_FIELD_MAP,
    fieldFallbacks: LEAD_ADDITIONAL_FIELD_ERROR_FALLBACKS,
    setError: (message: string) => setError(message),
    containerSelector: '.additional-form-panel',
  });

  const handleCreateAdditionalField = useCallback(async (
    values: AdditionalFieldFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<AdditionalFieldFormData>,
  ) => {
    const isDropdownOrCheckbox = values.fieldType === FIELD_TYPES.DROPDOWN || values.fieldType === FIELD_TYPES.CHECKBOX;
    setIsSaving(true);
    setError(null);
    try {
      const response = await leadAdditionalService.create({
        name: values.name,
        fieldType: values.fieldType,
        isRequired: values.isRequired,
        showInList: values.showInList,
        showInFilter: values.showInFilter,
        connectWithLeadPurpose: values.connectWithLeadPurpose,
        purposeId: values.purposeId || null,
        values: isDropdownOrCheckbox ? values.dropdownValues : [],
      });
      if (response.status) {
        table.setPageNumber(1);
        table.refresh();
        resetForm();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_ADDITIONAL_FIELD);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_ADDITIONAL_FIELD);
      return false;
    } finally {
      setIsSaving(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleUpdateAdditionalField = useCallback(async (
    id: string,
    values: AdditionalFieldFormData,
    { setSubmitting, setFieldError }: FormikHelpers<AdditionalFieldFormData>,
  ) => {
    const isDropdownOrCheckbox = values.fieldType === FIELD_TYPES.DROPDOWN || values.fieldType === FIELD_TYPES.CHECKBOX;
    setIsSaving(true);
    setError(null);
    try {
      const response = await leadAdditionalService.update(id, {
        name: values.name,
        fieldType: values.fieldType,
        isRequired: values.isRequired,
        showInList: values.showInList,
        showInFilter: values.showInFilter,
        connectWithLeadPurpose: values.connectWithLeadPurpose,
        purposeId: values.purposeId || null,
        values: isDropdownOrCheckbox ? values.dropdownValues : [],
      });
      if (response.status) {
        table.refresh();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_ADDITIONAL_FIELD);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_ADDITIONAL_FIELD);
      return false;
    } finally {
      setIsSaving(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleDeleteAdditionalField = useCallback(async (id: string) => {
    setDeleteError(null);
    try {
      const response = await leadAdditionalService.delete(id);
      if (response.status) {
        table.refresh();
        return true;
      }
      setDeleteError(response.message || ERROR_MESSAGES.DELETE_ADDITIONAL_FIELD);
      return false;
    } catch (err: unknown) {
      setDeleteError(getErrorMessage(err, ERROR_MESSAGES.DELETE_ADDITIONAL_FIELD));
      return false;
    }
  }, [table]);

  return {
    isSaving,
    error,
    setError,
    deleteError,
    setDeleteError,
    handleCreateAdditionalField,
    handleUpdateAdditionalField,
    handleDeleteAdditionalField,
  };
}
