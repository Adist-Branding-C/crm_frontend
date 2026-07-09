import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { branchService } from '../services/branch.service';
import { BRANCH_FIELD_MAP, BRANCH_FIELD_ERROR_FALLBACKS } from '../constants/branch.constants';
import type { BranchFormData } from '../types/branch.types';
import type { UseBranchCrudParams } from '../types/use-branch-crud.types';

/**
 * Branch create/update/delete API orchestration for the account-settings/branch tab.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive (loading, error, refresh, reset-to-page-1)
 *   and a toast trigger as narrow dependencies, rather than owning or re-exporting the pagination
 *   or toast hooks themselves - BranchPage.tsx owns those hooks directly and reads their full
 *   state from there, not through this hook.
 */
export function useBranchCrud({ pagination, showToastMessage }: UseBranchCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: BRANCH_FIELD_MAP,
    fieldFallbacks: BRANCH_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddBranch = useCallback(async (
    values: BranchFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<BranchFormData>,
  ) => {
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

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add branch');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add branch');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage]);

  const handleUpdateBranch = useCallback(async (
    id: number,
    values: BranchFormData,
    { setSubmitting, setFieldError }: FormikHelpers<BranchFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, description, status } = values;
      const requestData = { name: name.trim(), description: description.trim(), status };
      const response = await branchService.updateBranch(id, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update branch');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update branch');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError]);

  const handleDeleteBranch = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await branchService.deleteBranch(id);

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

  return { handleAddBranch, handleUpdateBranch, handleDeleteBranch };
}
