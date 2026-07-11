import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { customPipelineService } from '../services';
import { getErrorMessage } from '../../../shared/utils/error';
import { useSubmitErrorHandler } from '../../../shared/hooks/useSubmitErrorHandler';
import { CUSTOM_PIPELINE_FIELD_MAP, CUSTOM_PIPELINE_FIELD_ERROR_FALLBACKS } from '../constants';
import type { CustomPipelineFormData } from '../types/interface';
import type { UseCustomPipelineCrudParams } from '../types/use-custom-pipeline-crud.types';

const ERROR_MESSAGES = {
  CREATE: 'Failed to create custom pipeline',
  UPDATE: 'Failed to update custom pipeline',
  DELETE: 'Failed to delete custom pipeline',
};

/**
 * Custom pipeline create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   as a narrow dependency rather than owning or re-exporting the pagination hook itself -
 *   CustomPipelinePage.tsx owns useTableData directly and reads its full state from there.
 */
export function useCustomPipelineCrud({ table }: UseCustomPipelineCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: CUSTOM_PIPELINE_FIELD_MAP,
    fieldFallbacks: CUSTOM_PIPELINE_FIELD_ERROR_FALLBACKS,
    setError: table.setError,
  });

  const handleCreateCustomPipeline = useCallback(async (
    values: CustomPipelineFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CustomPipelineFormData>,
  ) => {
    table.setError('');
    table.setIsLoading(true);
    try {
      const response = await customPipelineService.createCustomPipeline({
        name: values.name.trim(),
        entityType: values.entityType,
        groupByField: values.groupByField,
      });
      if (response.status) {
        table.setPageNumber(1);
        table.refresh();
        resetForm();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.CREATE);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.CREATE);
      return false;
    } finally {
      table.setIsLoading(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleUpdateCustomPipeline = useCallback(async (
    id: string,
    values: CustomPipelineFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CustomPipelineFormData>,
  ) => {
    table.setError('');
    table.setIsLoading(true);
    try {
      const response = await customPipelineService.updateCustomPipeline(id, {
        name: values.name.trim(),
        groupByField: values.groupByField,
        isActive: values.isActive,
      });
      if (response.status) {
        table.refresh();
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, ERROR_MESSAGES.UPDATE);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, ERROR_MESSAGES.UPDATE);
      return false;
    } finally {
      table.setIsLoading(false);
      setSubmitting(false);
    }
  }, [table, submitError]);

  const handleDeleteCustomPipeline = useCallback(async (id: string) => {
    table.setError('');
    try {
      const response = await customPipelineService.deleteCustomPipeline(id);
      if (response.status) {
        table.refresh();
        return true;
      }
      table.setError(response.message || ERROR_MESSAGES.DELETE);
      return false;
    } catch (err: unknown) {
      table.setError(getErrorMessage(err, ERROR_MESSAGES.DELETE));
      return false;
    }
  }, [table]);

  return { handleCreateCustomPipeline, handleUpdateCustomPipeline, handleDeleteCustomPipeline };
}
