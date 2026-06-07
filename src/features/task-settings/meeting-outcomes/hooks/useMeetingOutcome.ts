import { useState, useCallback, useEffect } from 'react';
import { meetingOutcomeService } from '../services/meetingOutcome.service';
import type { MeetingOutcomeItem, MeetingOutcomeFormData } from '../types/meetingOutcome.types';

export function useMeetingOutcome() {
  const [meetingOutcomeList, setMeetingOutcomeList] = useState<MeetingOutcomeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMeetingOutcomes = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await meetingOutcomeService.getAll(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: MeetingOutcomeItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setMeetingOutcomeList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch meeting outcomes');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch meeting outcomes');
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
    fetchMeetingOutcomes();
  }, [fetchMeetingOutcomes]);

  const handleAdd = useCallback(async (values: MeetingOutcomeFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await meetingOutcomeService.create({ name, status });

      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setMeetingOutcomeList(prev => [...prev, { id: data.id, name, status } as unknown as MeetingOutcomeItem]);
        } else {
          fetchMeetingOutcomes();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add meeting outcome');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add meeting outcome');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchMeetingOutcomes]);

  const handleUpdate = useCallback(async (id: number, values: MeetingOutcomeFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await meetingOutcomeService.update(id, { name, status });

      if (response.status) {
        setMeetingOutcomeList(prev => prev.map(item =>
          item.id === id ? { ...item, name, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update meeting outcome');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update meeting outcome');
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
      const response = await meetingOutcomeService.delete(id);

      if (response.status) {
        setMeetingOutcomeList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete meeting outcome');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete meeting outcome');
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
    meetingOutcomeList,
    isLoading,
    error,
    fetchMeetingOutcomes,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
