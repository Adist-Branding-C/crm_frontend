import { useState, useCallback, useEffect } from 'react';
import { callTaskService } from '../services/callTask.service';
import { addCallTaskValidationSchema, editCallTaskValidationSchema } from '../validations/callTask.validation';
import { ADD_CALL_TASK_INITIAL_VALUES } from '../constants/callTask.constants';
import type { CallTaskItem, CallTaskFormData } from '../types/callTask.types';

export function useCallTask() {
  const [callTaskList, setCallTaskList] = useState<CallTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCallTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await callTaskService.getAll(params);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: CallTaskItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCallTaskList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch call tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch call tasks');
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
    fetchCallTasks();
  }, [fetchCallTasks]);

  const handleAdd = useCallback(async (values: CallTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await callTaskService.create(values);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCallTaskList(prev => [...prev, { id: data.id, ...values } as unknown as CallTaskItem]);
        } else {
          fetchCallTasks();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add call task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCallTasks]);

  const handleUpdate = useCallback(async (id: number, values: CallTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await callTaskService.update(id, values);
      if (response.status) {
        setCallTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values } as unknown as CallTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update call task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    setError('');
    try {
      const response = await callTaskService.delete(id);
      if (response.status) {
        setCallTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete call task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete call task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    callTaskList,
    isLoading,
    error,
    fetchCallTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    validationSchema: addCallTaskValidationSchema,
    editValidationSchema: editCallTaskValidationSchema,
    initialValues: ADD_CALL_TASK_INITIAL_VALUES,
  };
}
