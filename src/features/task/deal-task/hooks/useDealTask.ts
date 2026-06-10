import { useState, useCallback, useEffect } from 'react';
import { dealTaskService } from '../services/dealTask.service';
import { addDealTaskValidationSchema, editDealTaskValidationSchema } from '../validations/dealTask.validation';
import { ADD_DEAL_TASK_INITIAL_VALUES } from '../constants/dealTask.constants';
import type { DealTaskItem, DealTaskFormData } from '../types/dealTask.types';

export function useDealTask() {
  const [dealTaskList, setDealTaskList] = useState<DealTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDealTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await dealTaskService.getAll(params);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: DealTaskItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setDealTaskList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch deal tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch deal tasks');
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
    fetchDealTasks();
  }, [fetchDealTasks]);

  const handleAdd = useCallback(async (values: DealTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await dealTaskService.create(values);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setDealTaskList(prev => [...prev, { id: data.id, ...values, amount: Number(values.amount) || 0 } as unknown as DealTaskItem]);
        } else {
          fetchDealTasks();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add deal task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchDealTasks]);

  const handleUpdate = useCallback(async (id: number, values: DealTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await dealTaskService.update(id, values);
      if (response.status) {
        setDealTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values, amount: Number(values.amount) || 0 } as unknown as DealTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update deal task');
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
      const response = await dealTaskService.delete(id);
      if (response.status) {
        setDealTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete deal task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete deal task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    dealTaskList,
    isLoading,
    error,
    fetchDealTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    validationSchema: addDealTaskValidationSchema,
    editValidationSchema: editDealTaskValidationSchema,
    initialValues: ADD_DEAL_TASK_INITIAL_VALUES,
  };
}
