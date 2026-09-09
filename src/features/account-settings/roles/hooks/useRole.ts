import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { roleService } from '../services/role.service';
import { roleValidationSchema } from '../validations/role.validation';
import { ADD_ROLE_INITIAL_VALUES } from '../constants/role.constants';
import { hasSelectedPermission } from '../utils/roleFormData.util';
import type { FieldErrorMap, FieldErrorFallback } from '../../../../shared/types/formFieldError.types';
import type { RoleItem, RoleFormData } from '../types/role.types';

const ROLE_FIELD_MAP: FieldErrorMap = {
  role_name: 'roleName',
};

const ROLE_FIELD_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'role name', field: 'roleName' },
  { keyword: 'role', field: 'roleName' },
];

export function useRole() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [dependencyError, setDependencyError] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const pagination = useTableData<RoleItem>({
    fetchFn: async (params) => {
      const response = await roleService.getAllRoles(params as unknown as Record<string, string | number>);
      if (response.status) {
        const items = Array.isArray(response.data?.items) ? response.data.items : [];
        return { items, total: response.data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch roles');
    },
  });

  const submitError = useSubmitErrorHandler({
    fieldMap: ROLE_FIELD_MAP,
    fieldFallbacks: ROLE_FIELD_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddRole = useCallback(async (
    values: RoleFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<RoleFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      if (!hasSelectedPermission(values.permissions)) {
        pagination.setError('Please select at least one module permission.');
        return false;
      }

      const response = await roleService.createRole(values);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Role added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add role');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add role');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateRole = useCallback(async (
    id: string,
    values: RoleFormData,
    { setSubmitting, setFieldError }: FormikHelpers<RoleFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      if (!hasSelectedPermission(values.permissions)) {
        pagination.setError('Please select at least one module permission.');
        return false;
      }

      const response = await roleService.updateRole(id, values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Role updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update role');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update role');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleDeleteRole = useCallback(async (id: string) => {
    pagination.setError('');

    try {
      const response = await roleService.deleteRole(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Role deleted successfully', 'success');
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete role');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
        if (axiosErr.response?.status === 409) {
          setDependencyError(true);
          return false;
        }
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete role');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination, showToastMessage]);

  return {
    roleList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchRoles: pagination.refresh,
    handleAddRole,
    handleUpdateRole,
    handleDeleteRole,
    dependencyError,
    clearDependencyError: () => setDependencyError(false),
    validationSchema: roleValidationSchema,
    editValidationSchema: roleValidationSchema,
    initialValues: ADD_ROLE_INITIAL_VALUES,
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
