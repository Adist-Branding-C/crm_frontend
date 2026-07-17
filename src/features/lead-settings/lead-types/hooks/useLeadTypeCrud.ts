import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { leadTypeService } from '../services';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { ERROR_MESSAGES } from '../../constants/messages';
import { LEAD_TYPE_FIELD_MAP, LEAD_TYPE_FIELD_ERROR_FALLBACKS } from '../constants';
import type { LeadTypeFormData } from '../types/interface';
import type { UseLeadTypeCrudParams } from '../types/use-lead-type-crud.types';

/**
 * Lead type create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   LeadTypesPage.tsx owns useTableData directly and reads its full state from there.
 */
export function useLeadTypeCrud({ table }: UseLeadTypeCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: LEAD_TYPE_FIELD_MAP,
    fieldFallbacks: LEAD_TYPE_FIELD_ERROR_FALLBACKS,
    setError: table.setError,
  });

  const handleCreateLeadType = useCallback(async (
    values: LeadTypeFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<LeadTypeFormData>,
  ) => {
    table.setError('');
    table.setIsLoading(true);
    try {
      const response = await leadTypeService.createLeadType({ type: values.type.trim() });
      if (response.status) {
        table.setPageNumber(1);
        table.refresh();
        resetForm();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE_LEAD_TYPE);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE_LEAD_TYPE);
      return false;
    } finally {
      table.setIsLoading(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleUpdateLeadType = useCallback(async (
    id: string,
    values: LeadTypeFormData,
    { setSubmitting, setFieldError }: FormikHelpers<LeadTypeFormData>,
  ) => {
    table.setError('');
    table.setIsLoading(true);
    try {
      const response = await leadTypeService.updateLeadType(id, { type: values.type.trim() });
      if (response.status) {
        table.refresh();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_TYPE);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE_LEAD_TYPE);
      return false;
    } finally {
      table.setIsLoading(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleDeleteLeadType = useCallback(async (id: string) => {
    table.setError('');
    try {
      const response = await leadTypeService.deleteLeadType(id);
      if (response.status) {
        table.refresh();
        return true;
      }
      table.setError(response.message || ERROR_MESSAGES.DELETE_LEAD_TYPE);
      return false;
    } catch (err: unknown) {
      table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE_LEAD_TYPE));
      return false;
    }
  }, [table]);

  return { handleCreateLeadType, handleUpdateLeadType, handleDeleteLeadType };
}
