import { useState, useCallback, useEffect } from 'react';
import { workModeService } from '../services/workMode.service';
import { addWorkModeValidationSchema } from '../validations/workMode.validation';
import type { WorkModeItem, WorkModeFormData } from '../types/workMode.types';
import type { FormikHelpers } from 'formik';

const addWorkModeInitialValues: WorkModeFormData = {
  workModeName: '',
  description: '',
  status: '',
};

export function useWorkModes() {
  const [workModeList, setWorkModeList] = useState<WorkModeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWorkModes = useCallback(async (params: Record<string, string> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await workModeService.getAllWorkModes(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? response.data.items
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

  const handleAddWorkMode = useCallback(async (values: WorkModeFormData, { setSubmitting, resetForm }: FormikHelpers<WorkModeFormData>) => {
    setError('');
    setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.createWorkMode(requestData);

      if (response.status) {
        const newItemId = response.data?.id || response.data?.workMode?.id;
        if (newItemId) {
          setWorkModeList(prev => [...prev, { id: newItemId, workModeName, description, status }]);
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

  const handleUpdateWorkMode = useCallback(async (id: number, values: WorkModeFormData, { setSubmitting }: FormikHelpers<WorkModeFormData>) => {
    const modeId = Number(id);
    if (!modeId || isNaN(modeId)) {
      setError('Invalid work mode id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const requestData: WorkModeFormData = { workModeName, description, status };

      const response = await workModeService.updateWorkMode(modeId, requestData);

      if (response.status) {
        setWorkModeList(prev => prev.map(item =>
          Number(item.id) === modeId ? { ...item, workModeName, description, status } : item
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
    const modeId = Number(id);
    if (!modeId || isNaN(modeId)) {
      setError('Invalid work mode id');
      return false;
    }
    setError('');

    try {
      const response = await workModeService.deleteWorkMode(modeId);

      if (response.status) {
        setWorkModeList(prev => prev.filter(item => Number(item.id) !== modeId));
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
    initialValues: addWorkModeInitialValues,
  };
}
