import { useState, useCallback, useRef } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { agentService } from '../services/agent.service';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations/agent.validation';
import { designationService } from '../../designations/services/designation.service';
import { ADD_AGENT_INITIAL_VALUES } from '../constants/agent.constants';
import type { AgentItem, AgentFormData, DesignationOption } from '../types/agent.types';

const FIELD_MAP: Record<string, string> = {
  phone_number: 'phone',
  full_name: 'fullName',
  confirm_password: 'confirmPassword',
};

export function useAgent() {
  const [designationOptions, setDesignationOptions] = useState<DesignationOption[]>([]);
  const designationsLoaded = useRef(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const pagination = useTableData<AgentItem>({
    fetchFn: async (params) => {
      const response = await agentService.getAllAgents(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: AgentItem[]; pagination?: { total: number } } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.pagination?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch agents');
    },
  });

  const fetchDesignations = useCallback(async (force = false) => {
    if (!force && designationsLoaded.current) return;
    try {
      const response = await designationService.getAllDesignations({ pageNumber: '1', limit: '100' });

      if (response.status) {
        const data = response.data as { items?: Array<{ designationName?: string; name?: string; id: number }> } | undefined;
        const items = Array.isArray(data?.items) ? data.items : [];
        setDesignationOptions(
          items.map((item) => ({
            label: item.designationName || item.name || '',
            value: String(item.id),
          }))
        );
        designationsLoaded.current = true;
      }
    } catch {
      setDesignationOptions([]);
    }
  }, []);

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
      if (lower.includes('email')) { setFieldError('email', message); return 'email'; }
      if (lower.includes('phone')) { setFieldError('phone', message); return 'phone'; }
      if (lower.includes('password')) { setFieldError('password', message); return 'password'; }
      if (lower.includes('name')) { setFieldError('fullName', message); return 'fullName'; }
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

  const handleAddAgent = useCallback(async (
    values: AgentFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, password, designationId, status } = values;
      const sanitizedPhone = values.phone.replace(/\D/g, '').slice(0, 10);
      const requestData = { fullName, email: email.trim(), phone: sanitizedPhone, password, designationId, status };

      const response = await agentService.createAgent(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Staff member added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to add staff');
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
          else { pagination.setError(serverMessage || 'Failed to add staff'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add staff');
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

  const handleUpdateAgent = useCallback(async (
    staffId: string,
    values: AgentFormData,
    { setSubmitting, setFieldError }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, designationId, status } = values;
      const sanitizedPhone = values.phone.replace(/\D/g, '').slice(0, 10);
      const requestData = { fullName, email: email.trim(), phone: sanitizedPhone, designationId, status };

      const response = await agentService.updateAgent(staffId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to update staff');
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
          else { pagination.setError(serverMessage || 'Failed to update staff'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update staff');
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

  const handleDeleteAgent = useCallback(async (staffId: string) => {
    pagination.setError('');

    try {
      const response = await agentService.deleteAgent(staffId);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    agentList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchAgents: pagination.refresh,
    handleAddAgent,
    handleUpdateAgent,
    handleDeleteAgent,
    validationSchema: addAgentValidationSchema,
    editValidationSchema: editAgentValidationSchema,
    initialValues: ADD_AGENT_INITIAL_VALUES,
    designationOptions,
    fetchDesignations,
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
