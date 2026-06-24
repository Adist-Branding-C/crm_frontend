import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { designationService } from '../services/designation.service';
import { addDesignationValidationSchema, editDesignationValidationSchema } from '../validations/designation.validation';
import { ADD_DESIGNATION_INITIAL_VALUES } from '../constants/designation.constants';
import type { DesignationItem, DesignationFormData } from '../types/designation.types';

export function useDesignation() {
  const pagination = useTableData<DesignationItem>({
    fetchFn: async (params) => {
      const response = await designationService.getAllDesignations(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: DesignationItem[]; pagination?: { total: number } } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch designations');
    },
  });

  const handleAddDesignation = useCallback(async (
    values: DesignationFormData,
    { setSubmitting, resetForm }: FormikHelpers<DesignationFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await designationService.createDesignation(values);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add designation');
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

  const handleUpdateDesignation = useCallback(async (
    id: number,
    values: DesignationFormData,
    { setSubmitting }: FormikHelpers<DesignationFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await designationService.updateDesignation(id, values);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update designation');
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

  const handleDeleteDesignation = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await designationService.deleteDesignation(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete designation');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete designation');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    designationList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchDesignations: pagination.refresh,
    handleAddDesignation,
    handleUpdateDesignation,
    handleDeleteDesignation,
    validationSchema: addDesignationValidationSchema,
    editValidationSchema: editDesignationValidationSchema,
    initialValues: ADD_DESIGNATION_INITIAL_VALUES,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
