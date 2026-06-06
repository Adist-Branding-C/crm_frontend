import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { workModeService } from '../services/workMode.service';
import { addWorkModeValidationSchema, editWorkModeValidationSchema } from '../validations/workMode.validation';
import { ADD_WORK_MODE_INITIAL_VALUES } from '../constants/workMode.constants';
import type { WorkModeItem, WorkModeFormData } from '../types/workMode.types';

export function useWorkMode() {
  const [workModeList, setWorkModeList] = useState<WorkModeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorkModes = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await workModeService.getAllWorkModes(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: WorkModeItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setWorkModeList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch work modes');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch work modes');
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
    fetchWorkModes();
  }, [fetchWorkModes]);

  const handleAddWorkMode = useCallback(async (
    values: WorkModeFormData,
    { setSubmitting, resetForm }: FormikHelpers<WorkModeFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.createWorkMode(requestData);

      if (response.status) {
        const createdItem = response.data;
        if (createdItem && typeof createdItem === 'object' && 'id' in createdItem) {
          setWorkModeList(prev => [...prev, createdItem as WorkModeItem]);
        } else {
          fetchWorkModes();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add work mode');
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
  }, [fetchWorkModes]);

  const handleUpdateWorkMode = useCallback(async (
    id: number,
    values: WorkModeFormData,
    { setSubmitting }: FormikHelpers<WorkModeFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.updateWorkMode(id, requestData);

      if (response.status) {
        setWorkModeList(prev => prev.map(item =>
          item.id === id ? { ...item, workModeName, description, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update work mode');
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

  const handleDeleteWorkMode = useCallback(async (id: number) => {
    setError('');

    try {
      const response = await workModeService.deleteWorkMode(id);

      if (response.status) {
        setWorkModeList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete work mode');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete work mode');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    workModeList,
    isLoading,
    error,
    fetchWorkModes,
    handleAddWorkMode,
    handleUpdateWorkMode,
    handleDeleteWorkMode,
    validationSchema: addWorkModeValidationSchema,
    editValidationSchema: editWorkModeValidationSchema,
    initialValues: ADD_WORK_MODE_INITIAL_VALUES,
  };
}
