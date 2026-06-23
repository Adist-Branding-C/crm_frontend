import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { branchService } from '../services/branch.service';
import { addBranchValidationSchema, editBranchValidationSchema } from '../validations/branch.validation';
import { ADD_BRANCH_INITIAL_VALUES } from '../constants/branch.constants';
import type { BranchItem, BranchFormData } from '../types/branch.types';

export function useBranch() {
  const pagination = useTableData<BranchItem>({
    fetchFn: async (params) => {
      const response = await branchService.getAllBranches(params);
      if (response.status) {
        const data = response.data as { items: BranchItem[]; total?: number } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch branches');
    },
  });

  const handleAddBranch = useCallback(async (
    values: BranchFormData,
    { setSubmitting, resetForm }: FormikHelpers<BranchFormData>,
  ): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };
      const response = await branchService.createBranch(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add branch');
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

  const handleUpdateBranch = useCallback(async (
    id: number,
    values: BranchFormData,
    { setSubmitting }: FormikHelpers<BranchFormData>,
  ): Promise<boolean> => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      pagination.setError('Invalid branch id');
      setSubmitting(false);
      return false;
    }
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };
      const response = await branchService.updateBranch(branchId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update branch');
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

  const handleDeleteBranch = useCallback(async (id: number): Promise<boolean> => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      pagination.setError('Invalid branch id');
      return false;
    }
    pagination.setError('');

    try {
      const response = await branchService.deleteBranch(branchId);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete branch');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    branchList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchBranches: pagination.refresh,
    handleAddBranch,
    handleUpdateBranch,
    handleDeleteBranch,
    validationSchema: addBranchValidationSchema,
    editValidationSchema: editBranchValidationSchema,
    initialValues: ADD_BRANCH_INITIAL_VALUES,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
