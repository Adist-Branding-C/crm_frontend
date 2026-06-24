import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { departmentService } from '../services/department.service';
import { addDepartmentValidationSchema, editDepartmentValidationSchema } from '../validations/department.validation';
import { ADD_DEPARTMENT_INITIAL_VALUES } from '../constants/department.constants';
import type { DepartmentItem, DepartmentFormData } from '../types/department.types';

export function useDepartment() {
  const pagination = useTableData<DepartmentItem>({
    fetchFn: async (params) => {
      const response = await departmentService.getAllDepartments(params as unknown as Record<string, string | number>);
      if (response.status) {
        const items = Array.isArray(response.data?.items) ? response.data.items : [];
        return { items, total: response.data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch departments');
    },
  });

  const handleAddDepartment = useCallback(async (
    values: DepartmentFormData,
    { setSubmitting, resetForm }: FormikHelpers<DepartmentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await departmentService.createDepartment(values);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add department');
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

  const handleUpdateDepartment = useCallback(async (
    id: number,
    values: DepartmentFormData,
    { setSubmitting }: FormikHelpers<DepartmentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await departmentService.updateDepartment(id, values);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update department');
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

  const handleDeleteDepartment = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await departmentService.deleteDepartment(id);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete department');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete department');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    departmentList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchDepartments: pagination.refresh,
    handleAddDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
    validationSchema: addDepartmentValidationSchema,
    editValidationSchema: editDepartmentValidationSchema,
    initialValues: ADD_DEPARTMENT_INITIAL_VALUES,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
