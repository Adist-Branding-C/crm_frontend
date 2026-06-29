import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { useToast } from '../../hooks/useToast';
import { taskCategoryApiService } from '../services';
import type { TaskCategoryItem, TaskCategoryFormData, TaskCategoryApiResponse } from '../types/index';

const FIELD_MAP: Record<string, string> = {};

export function useTaskCategory() {
  const { showToastMessage, toastMessage, toastType, showToast, setShowToast } = useToast();

  const pagination = useTableData<TaskCategoryItem>({
    fetchFn: async (params) => {
      const response = await taskCategoryApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: TaskCategoryItem[]; pagination?: { total: number } } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return {
          items: Array.isArray(items) ? (items as unknown as Record<string, unknown>[]).map((item) => ({
            id: item.id as number,
            category: (item.category || item.taskCategory || '') as string,
            action: (item.action || '') as string,
          })) : [],
          total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0),
        };
      }
      throw new Error(response.message || 'Failed to fetch task categories');
    },
  });

  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const applyFieldErrors = useCallback((
    errors: Record<string, string[]> | undefined,
    message: string | undefined,
    field: string | undefined,
    setFieldError: (field: string, msg: string) => void,
  ): string | null => {
    if (field && message) {
      const mapped = FIELD_MAP[field] || field;
      setFieldError(mapped, message);
      return mapped;
    }
    if (errors && typeof errors === 'object') {
      let firstField: string | null = null;
      Object.entries(errors).forEach(([f, msgs]) => {
        const mapped = FIELD_MAP[f] || f;
        if (msgs?.length && !firstField) firstField = mapped;
        if (msgs?.length) setFieldError(mapped, msgs[0]!);
      });
      return firstField;
    }
    if (message) {
      const lower = message.toLowerCase();
      if (lower.includes('category')) { setFieldError('category', message); return 'category'; }
      if (lower.includes('action')) { setFieldError('action', message); return 'action'; }
    }
    return null;
  }, []);

  const handleAdd = useCallback(async (
    values: TaskCategoryFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<TaskCategoryFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { category, action } = values;
      const response: TaskCategoryApiResponse = await taskCategoryApiService.create({ category: category.trim(), action: action.trim() });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Task category added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        pagination.setError(response.message || 'Failed to add task category');
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
          else { pagination.setError(serverMessage || 'Failed to add task category'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add task category');
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
    values: TaskCategoryFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TaskCategoryFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { category, action } = values;
      const response: TaskCategoryApiResponse = await taskCategoryApiService.update(id, { category: category.trim(), action: action.trim() });

      if (response.status) {
        pagination.refresh();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        pagination.setError(response.message || 'Failed to update task category');
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
          else { pagination.setError(serverMessage || 'Failed to update task category'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update task category');
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
      const response = await taskCategoryApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete task category');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete task category');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return {
    taskCategoryList: pagination.list,
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
