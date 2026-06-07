import { useState, useCallback, useEffect } from 'react';
import { callReasonService } from '../services/callReason.service';
import type { CallReasonItem, CallReasonFormData } from '../types/callReason.types';

export function useCallReason() {
  const [callReasonList, setCallReasonList] = useState<CallReasonItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCallReasons = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await callReasonService.getAll(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: CallReasonItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCallReasonList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch call reasons');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch call reasons');
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
    fetchCallReasons();
  }, [fetchCallReasons]);

  const handleAdd = useCallback(async (values: CallReasonFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callReasonService.create({ name, status });

      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCallReasonList(prev => [...prev, { id: data.id, name, status } as unknown as CallReasonItem]);
        } else {
          fetchCallReasons();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add call reason');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add call reason');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCallReasons]);

  const handleUpdate = useCallback(async (id: number, values: CallReasonFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callReasonService.update(id, { name, status });

      if (response.status) {
        setCallReasonList(prev => prev.map(item =>
          item.id === id ? { ...item, name, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update call reason');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update call reason');
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
      const response = await callReasonService.delete(id);

      if (response.status) {
        setCallReasonList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete call reason');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete call reason');
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
    callReasonList,
    isLoading,
    error,
    fetchCallReasons,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
