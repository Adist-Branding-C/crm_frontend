import { useState, useCallback, useEffect } from 'react';
import { callStatusService } from '../services/callStatus.service';
import type { CallStatusItem, CallStatusFormData } from '../types/callStatus.types';

export function useCallStatus() {
  const [callStatusList, setCallStatusList] = useState<CallStatusItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCallStatuses = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await callStatusService.getAll(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: CallStatusItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCallStatusList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch call statuses');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch call statuses');
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
    fetchCallStatuses();
  }, [fetchCallStatuses]);

  const handleAdd = useCallback(async (values: CallStatusFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callStatusService.create({ name, status });

      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCallStatusList(prev => [...prev, { id: data.id, name, status } as unknown as CallStatusItem]);
        } else {
          fetchCallStatuses();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add call status');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add call status');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCallStatuses]);

  const handleUpdate = useCallback(async (id: number, values: CallStatusFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callStatusService.update(id, { name, status });

      if (response.status) {
        setCallStatusList(prev => prev.map(item =>
          item.id === id ? { ...item, name, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update call status');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update call status');
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
    setIsLoading(true);

    try {
      const response = await callStatusService.delete(id);

      if (response.status) {
        setCallStatusList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete call status');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete call status');
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

  return {
    callStatusList,
    isLoading,
    error,
    fetchCallStatuses,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
