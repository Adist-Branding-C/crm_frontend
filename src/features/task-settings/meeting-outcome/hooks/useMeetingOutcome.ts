import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { useToast } from '../../../../shared/hooks/useToast';
import { applyFieldErrors } from '../../call-reason/utils/applyFieldErrors';
import { meetingOutcomeApiService } from '../services';
import type { MeetingOutcomeItem, MeetingOutcomeFormData, MeetingOutcomeApiResponse } from '../types/index';

export function useMeetingOutcome() {
  const { showToastMessage, toastMessage, toastType, showToast, setShowToast } = useToast();

  const pagination = useTableData<MeetingOutcomeItem>({
    fetchFn: async (params) => {
      const response = await meetingOutcomeApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: MeetingOutcomeItem[]; pagination?: { total: number } } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch meeting outcomes');
    },
  });

  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAdd = useCallback(async (
    values: MeetingOutcomeFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response: MeetingOutcomeApiResponse = await meetingOutcomeApiService.create({ name: name.trim(), status });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Meeting outcome added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        pagination.setError(response.message || 'Failed to add meeting outcome');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
          if (errorField) scrollAndFocusError();
          else { pagination.setError(serverMessage || 'Failed to add meeting outcome'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add meeting outcome');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        pagination.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [applyFieldErrors, scrollAndFocusError, scrollToTop, showToastMessage, pagination]);

  const handleUpdate = useCallback(async (
    id: number,
    values: MeetingOutcomeFormData,
    { setSubmitting, setFieldError }: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response: MeetingOutcomeApiResponse = await meetingOutcomeApiService.update(id, { name: name.trim(), status });

      if (response.status) {
        pagination.refresh();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        pagination.setError(response.message || 'Failed to update meeting outcome');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
          if (errorField) scrollAndFocusError();
          else { pagination.setError(serverMessage || 'Failed to update meeting outcome'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update meeting outcome');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        pagination.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [applyFieldErrors, scrollAndFocusError, scrollToTop, pagination]);

  const handleDelete = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await meetingOutcomeApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete meeting outcome');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete meeting outcome');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return {
    meetingOutcomeList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    handleAdd,
    handleUpdate,
    handleDelete,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
