import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../constants/fieldErrors';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskCrudPagination } from '../types/taskCrud.types';

export interface TaskCrudDataService<TFormData, TItem> {
  create: (data: TFormData) => Promise<ApiResponse<TItem>>;
  update: (id: number, data: TFormData) => Promise<ApiResponse<TItem>>;
  delete: (id: number) => Promise<ApiResponse<null>>;
}

export interface TaskCrudMessages {
  added: string;
  updated: string;
  deleted: string;
  addFailed: string;
  updateFailed: string;
  deleteFailed: string;
}

interface UseTaskCrudParams<TFormData, TItem> {
  pagination: TaskCrudPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
  dataService: TaskCrudDataService<TFormData, TItem>;
  messages: TaskCrudMessages;
}

/**
 * Add/update/delete handlers for a task-type entity: toast + list refresh on
 * success, Formik field-error mapping (via useSubmitErrorHandler) on failure.
 *
 * Used by:
 * - useTaskCrud (task), useCallTaskCrud, useCampaignTaskCrud, useDealTaskCrud - each
 *   passes its own data service and toast copy, then renames the returned handlers
 *   to its own handleAddX/handleUpdateX/handleDeleteX to keep its public API stable.
 *
 * Notes:
 * - Previously each of the four sub-modules reimplemented this exact try/catch/finally
 *   flow with only the data service and message strings differing.
 */
export function useTaskCrud<TFormData, TItem>({ pagination, showToastMessage, dataService, messages }: UseTaskCrudParams<TFormData, TItem>) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAdd = useCallback(async (
    values: TFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dataService.create(values);

      if (response.status) {
        pagination.refresh();
        showToastMessage(messages.added, 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, messages.addFailed);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, messages.addFailed);
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage, dataService, messages]);

  const handleUpdate = useCallback(async (
    id: number,
    values: TFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dataService.update(id, values);

      if (response.status) {
        pagination.refresh();
        showToastMessage(messages.updated, 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, messages.updateFailed);
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, messages.updateFailed);
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage, dataService, messages]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      const response = await dataService.delete(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage(messages.deleted, 'success');
        return true;
      }
      showToastMessage(response.message || messages.deleteFailed, 'error');
      return false;
    } catch {
      showToastMessage(messages.deleteFailed, 'error');
      return false;
    }
  }, [pagination, showToastMessage, dataService, messages]);

  return { handleAdd, handleUpdate, handleDelete };
}
