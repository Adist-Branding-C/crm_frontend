import { useState, useCallback, useEffect } from 'react';
import { campaignTaskService } from '../services/campaignTask.service';
import { addCampaignTaskValidationSchema, editCampaignTaskValidationSchema } from '../validations/campaignTask.validation';
import { ADD_CAMPAIGN_TASK_INITIAL_VALUES } from '../constants/campaignTask.constants';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/campaignTask.types';

export function useCampaignTask() {
  const [campaignTaskList, setCampaignTaskList] = useState<CampaignTaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCampaignTasks = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await campaignTaskService.getAll(params);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: CampaignTaskItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCampaignTaskList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch campaign tasks');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch campaign tasks');
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
    fetchCampaignTasks();
  }, [fetchCampaignTasks]);

  const handleAdd = useCallback(async (values: CampaignTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await campaignTaskService.create(values);
      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setCampaignTaskList(prev => [...prev, { id: data.id, ...values } as unknown as CampaignTaskItem]);
        } else {
          fetchCampaignTasks();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add campaign task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchCampaignTasks]);

  const handleUpdate = useCallback(async (id: number, values: CampaignTaskFormData) => {
    setError('');
    setIsLoading(true);
    try {
      const response = await campaignTaskService.update(id, values);
      if (response.status) {
        setCampaignTaskList(prev => prev.map(item =>
          item.id === id ? { ...item, ...values } as unknown as CampaignTaskItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update campaign task');
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
      const response = await campaignTaskService.delete(id);
      if (response.status) {
        setCampaignTaskList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete campaign task');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete campaign task');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    campaignTaskList,
    isLoading,
    error,
    fetchCampaignTasks,
    handleAdd,
    handleUpdate,
    handleDelete,
    validationSchema: addCampaignTaskValidationSchema,
    editValidationSchema: editCampaignTaskValidationSchema,
    initialValues: ADD_CAMPAIGN_TASK_INITIAL_VALUES,
  };
}
