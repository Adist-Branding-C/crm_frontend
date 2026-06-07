import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { branchService } from '../services/branch.service';
import { addBranchValidationSchema, editBranchValidationSchema } from '../validations/branch.validation';
import { ADD_BRANCH_INITIAL_VALUES } from '../constants/branch.constants';
import type { BranchItem, BranchFormData, GetAllBranchesParams } from '../types/branch.types';

export function useBranch() {
  const [branchList, setBranchList] = useState<BranchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBranches = useCallback(async (params: GetAllBranchesParams = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await branchService.getAllBranches(params);

      if (response.status) {
        setBranchList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch branches');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch branches');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  const handleAddBranch = useCallback(async (
    values: BranchFormData,
    { setSubmitting, resetForm }: FormikHelpers<BranchFormData>,
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };

      const response = await branchService.createBranch(requestData);

      if (response.status) {
        const newItem: BranchItem = { id: response.data?.id || response.data?.branch?.id || 0, name, description, status };
        if (newItem.id) {
          setBranchList(prev => [...prev, newItem]);
        } else {
          fetchBranches();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add branch');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [fetchBranches]);

  const handleUpdateBranch = useCallback(async (
    id: number,
    values: BranchFormData,
    { setSubmitting }: FormikHelpers<BranchFormData>,
  ): Promise<boolean> => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      setError('Invalid branch id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name, description, status };

      const response = await branchService.updateBranch(branchId, requestData);

      if (response.status) {
        setBranchList(prev => prev.map(item =>
          Number(item.id) === branchId ? { ...item, name, description, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update branch');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteBranch = useCallback(async (id: number): Promise<boolean> => {
    const branchId = Number(id);
    if (!branchId || isNaN(branchId)) {
      setError('Invalid branch id');
      return false;
    }
    setError('');

    try {
      const response = await branchService.deleteBranch(branchId);

      if (response.status) {
        setBranchList(prev => prev.filter(item => Number(item.id) !== branchId));
        return true;
      } else {
        setError(response.message || 'Failed to delete branch');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete branch');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    branchList,
    isLoading,
    error,
    fetchBranches,
    handleAddBranch,
    handleUpdateBranch,
    handleDeleteBranch,
    validationSchema: addBranchValidationSchema,
    editValidationSchema: editBranchValidationSchema,
    initialValues: ADD_BRANCH_INITIAL_VALUES,
  };
}
