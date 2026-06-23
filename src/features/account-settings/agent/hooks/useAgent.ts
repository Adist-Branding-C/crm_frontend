import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { agentService } from '../services/agent.service';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations/agent.validation';
import { designationService } from '../../designations/services/designation.service';
import { ADD_AGENT_INITIAL_VALUES } from '../constants/agent.constants';
import type { AgentItem, AgentFormData, DesignationOption } from '../types/agent.types';

export function useAgent() {
  const [designationOptions, setDesignationOptions] = useState<DesignationOption[]>([]);
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

  const fetchDesignations = useCallback(async () => {
    try {
      const response = await designationService.getAllDesignations({ page: '1', limit: '100' });

      if (response.status) {
        const data = response.data as { items?: Array<{ designationName?: string; name?: string; id: number }> } | undefined;
        const items = Array.isArray(data?.items) ? data.items : [];
        setDesignationOptions(
          items.map((item) => ({
            label: item.designationName || item.name || '',
            value: String(item.id),
          }))
        );
      }
    } catch {
      setDesignationOptions([]);
    }
  }, []);

  const handleAddAgent = useCallback(async (
    values: AgentFormData,
    { setSubmitting, resetForm }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, phone, password, designationId, status } = values;
      const requestData = { fullName, email, phone, password, designationId, status };

      const response = await agentService.createAgent(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Staff member added successfully', 'success');
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add agent');
        showToastMessage(response.message || 'Failed to add agent', 'error');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        const message = axiosErr.response?.data?.message || 'Failed to add agent';
        pagination.setError(message);
        showToastMessage(message, 'error');
      } else if (err && typeof err === 'object' && 'message' in err) {
        const message = (err as { message: string }).message;
        pagination.setError(message);
        showToastMessage(message, 'error');
      } else {
        pagination.setError('Network error. Please try again.');
        showToastMessage('Network error. Please try again.', 'error');
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
    { setSubmitting }: FormikHelpers<AgentFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { fullName, email, phone, designationId, status } = values;
      const requestData = { fullName, email, phone, designationId, status };

      const response = await agentService.updateAgent(staffId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update agent');
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
