import { useState, useCallback, useEffect } from 'react';
import { agentService } from '../services/agent.service';
import { addAgentValidationSchema, editAgentValidationSchema } from '../validations/agent.validation';
import { designationService } from '../../designations/services/designation.service';

const addAgentInitialValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  designationId: '',
  status: '',
};

export function useAgent() {
  const [agentList, setAgentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [designationOptions, setDesignationOptions] = useState([]);

  const fetchAgents = useCallback(async (params = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await agentService.getAllAgents(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? response.data.items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setAgentList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch agents');
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to fetch agents');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchDesignations = useCallback(async () => {
    try {
      const response = await designationService.getAllDesignations({ page: 1, limit: 100 });

      if (response.status) {
        const items = Array.isArray(response.data?.items) ? response.data.items : [];
        setDesignationOptions(
          items.map((item) => ({
            label: item.designationName || item.name,
            value: item.id,
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

  const handleAddAgent = useCallback(async (values, { setSubmitting, resetForm }) => {
    setError('');
    setIsLoading(true);

    try {
      const { fullName, email, phone, password, designationId, status } = values;
      const requestData = { fullName, email, phone, password, designationId, status };

      const response = await agentService.createAgent(requestData);

      if (response.status) {
        const newItemId = response.data?.id || response.data?.staff?.id;
        if (newItemId) {
          setAgentList(prev => [...prev, { id: newItemId, fullName, email, phone, designationId, status }]);
        } else {
          fetchAgents();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add agent');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to add agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateAgent = useCallback(async (id, values, { setSubmitting }) => {
    const agentId = Number(id);
    if (!agentId || isNaN(agentId)) {
      setError('Invalid agent id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { fullName, email, phone, designationId, status } = values;
      const requestData = { fullName, email, phone, designationId, status };

      const response = await agentService.updateAgent(agentId, requestData);

      if (response.status) {
        setAgentList(prev => prev.map(item =>
          Number(item.id) === agentId ? { ...item, fullName, email, phone, designationId, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update agent');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to update agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteAgent = useCallback(async (id) => {
    const agentId = Number(id);
    if (!agentId || isNaN(agentId)) {
      setError('Invalid agent id');
      return false;
    }
    setError('');

    try {
      const response = await agentService.deleteAgent(agentId);

      if (response.status) {
        setAgentList(prev => prev.filter(item => Number(item.id) !== agentId));
        return true;
      } else {
        setError(response.message || 'Failed to delete agent');
        return false;
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        setError(axiosErr.response?.data?.message || 'Failed to delete agent');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError(err.message);
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
