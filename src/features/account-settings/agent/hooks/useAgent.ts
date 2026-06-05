import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { agentService } from '../services/agent.service';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations/agent.validation';
import { designationService } from '../../designations/services/designation.service';
import type { AgentItem, AgentFormData, DesignationOption } from '../types/agent.types';

const addAgentInitialValues: AgentFormData = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  designationId: '',
  status: '',
};

export function useAgent() {
  const [agentList, setAgentList] = useState<AgentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [designationOptions, setDesignationOptions] = useState<DesignationOption[]>([]);

  const fetchAgents = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await agentService.getAllAgents(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: AgentItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setAgentList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch agents');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch agents');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleAddAgent = useCallback(async (
    values: AgentFormData,
    { setSubmitting, resetForm }: FormikHelpers<AgentFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { fullName, email, phone, password, designationId, status } = values;
      const requestData = { fullName, email, phone, password, designationId, status };

      const response = await agentService.createAgent(requestData);

      if (response.status) {
        const data = response.data as { id?: number; staff_id?: string; staff?: { id?: number; staff_id?: string } } | undefined;
        const newItemId = data?.id || data?.staff?.id;
        const newItemStaffId = data?.staff_id || data?.staff?.staff_id;
        if (newItemId) {
          setAgentList(prev => [...prev, { id: newItemId, staff_id: newItemStaffId, fullName, email, phone, designationId, status } as unknown as AgentItem]);
        } else {
          fetchAgents();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add agent');
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
  }, [fetchAgents]);

  const handleUpdateAgent = useCallback(async (
    staffId: string,
    values: AgentFormData,
    { setSubmitting }: FormikHelpers<AgentFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { fullName, email, phone, designationId, status } = values;
      const requestData = { fullName, email, phone, designationId, status };

      const response = await agentService.updateAgent(staffId, requestData);

      if (response.status) {
        setAgentList(prev => prev.map(item =>
          item.staff_id === staffId ? { ...item, fullName, email, phone, designationId, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update agent');
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

  const handleDeleteAgent = useCallback(async (staffId: string) => {
    setError('');

    try {
      const response = await agentService.deleteAgent(staffId);

      if (response.status) {
        setAgentList(prev => prev.filter(item => item.staff_id !== staffId));
        return true;
      } else {
        setError(response.message || 'Failed to delete agent');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    agentList,
    isLoading,
    error,
    fetchAgents,
    handleAddAgent,
    handleUpdateAgent,
    handleDeleteAgent,
    validationSchema: addAgentValidationSchema,
    editValidationSchema: editAgentValidationSchema,
    initialValues: addAgentInitialValues,
    designationOptions,
    fetchDesignations,
  };
}
