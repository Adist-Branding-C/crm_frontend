import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { branchService } from '../services/branch.service';
import { addBranchValidationSchema, editBranchValidationSchema } from '../validations/branch.validation';
import { ADD_BRANCH_INITIAL_VALUES } from '../constants/branch.constants';
import type { BranchItem, BranchFormData } from '../types/branch.types';

const FIELD_MAP: Record<string, string> = {
  name: 'name',
  branch_name: 'name',
};

export function useBranch() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

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
        if (msgs?.length) setFieldError(mapped, msgs[0]);
      });
      return firstField;
    }
    if (message) {
      const lower = message.toLowerCase();
      if (lower.includes('branch') || lower.includes('name')) { setFieldError('name', message); return 'name'; }
    }
    return null;
  }, []);

  const scrollAndFocusError = useCallback((fieldName: string) => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (!drawerBody) return;
      const errorEl = drawerBody.querySelector('.input-error');
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorEl as HTMLElement).focus();
      }
    }, 0);
  }, []);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (drawerBody) {
        drawerBody.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  }, []);

  const handleAddBranch = useCallback(async (
    values: BranchFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<BranchFormData>,
  ): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name: name.trim(), description: description.trim(), status };
      const response = await branchService.createBranch(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Branch added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to add branch');
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
          if (errorField) scrollAndFocusError(errorField);
          else { pagination.setError(serverMessage || 'Failed to add branch'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add branch');
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
  }, []);

  const handleUpdateBranch = useCallback(async (
    id: number,
    values: BranchFormData,
    { setSubmitting, setFieldError }: FormikHelpers<BranchFormData>,
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
      const requestData = { name: name.trim(), description: description.trim(), status };
      const response = await branchService.updateBranch(branchId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to update branch');
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
          if (errorField) scrollAndFocusError(errorField);
          else { pagination.setError(serverMessage || 'Failed to update branch'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update branch');
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
