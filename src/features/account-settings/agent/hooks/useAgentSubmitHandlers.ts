import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateAgent } from './useCreateAgent';
import { useUpdateAgent } from './useUpdateAgent';
import { useDeleteAgent } from './useDeleteAgent';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { AgentItem, AgentFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useAgentSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateAgent();
  const update = useUpdateAgent();
  const removal = useDeleteAgent();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: AgentFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { fullName, email, phone, password, designationId, departmentId, status } = values;
      const response = await create.create({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        designationId,
        departmentId,
        status,
      });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Agent added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add agent');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add agent'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add agent');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: AgentFormData,
    { setSubmitting, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: AgentFormData = {
      fullName: item.fullName || item.name || '',
      email: item.email || '',
      phone: item.phone || item.phone_number || item.phoneNumber || item.mobile || '',
      password: '',
      confirmPassword: '',
      designationId: String(item.designationId ?? item.designation_id ?? item.designation?.id ?? ''),
      departmentId: String(item.departmentId ?? item.department_id ?? item.department?.id ?? ''),
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { fullName, email, phone, designationId, departmentId, status } = values;
      const staffId = config.editingItem.staff_id || config.editingItem.id;
      const response = await update.update(staffId, {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        designationId,
        departmentId,
        status,
      } as unknown as AgentFormData);

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Agent updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update agent');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update agent'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update agent');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    fetch.setError('');

    try {
      const staffId = config.deletingItem.staff_id || config.deletingItem.id;
      const response = await removal.remove(staffId);

      if (response?.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        fetch.setError(response?.message || 'Failed to delete agent');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message || 'Failed to delete agent');
    }
  }, [removal, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
