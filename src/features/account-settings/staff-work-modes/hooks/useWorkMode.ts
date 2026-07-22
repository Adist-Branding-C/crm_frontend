import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { workModeService } from '../services/workMode.service';
import { addWorkModeValidationSchema, editWorkModeValidationSchema } from '../validations/workMode.validation';
import { ADD_WORK_MODE_INITIAL_VALUES } from '../constants/workMode.constants';
import type { WorkModeItem, WorkModeFormData } from '../types/workMode.types';

export function useWorkMode() {
  const pagination = useTableData<WorkModeItem>({
    fetchFn: async (params) => {
      const response = await workModeService.getAllWorkModes(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: WorkModeItem[]; pagination?: { total: number } } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch work modes');
    },
  });

  const handleAddWorkMode = useCallback(async (
    values: WorkModeFormData,
    { setSubmitting, resetForm }: FormikHelpers<WorkModeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.createWorkMode(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add work mode');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateWorkMode = useCallback(async (
    id: number,
    values: WorkModeFormData,
    { setSubmitting }: FormikHelpers<WorkModeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.updateWorkMode(id, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update work mode');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteWorkMode = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await workModeService.deleteWorkMode(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete work mode');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    workModeList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchWorkModes: pagination.refresh,
    handleAddWorkMode,
    handleUpdateWorkMode,
    handleDeleteWorkMode,
    validationSchema: addWorkModeValidationSchema,
    editValidationSchema: editWorkModeValidationSchema,
    initialValues: ADD_WORK_MODE_INITIAL_VALUES,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
