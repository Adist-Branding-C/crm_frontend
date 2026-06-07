import { useState, useCallback, useEffect } from 'react';
import { taskCategoryService } from '../services/taskCategory.service';
import type { TaskCategoryItem, TaskCategoryFormData } from '../types/taskCategory.types';

export function useTaskCategory() {
  const [taskCategoryList, setTaskCategoryList] = useState<TaskCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTaskCategories = useCallback(async (params: Record<string, string | number | undefined> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await taskCategoryService.getAll(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: TaskCategoryItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setTaskCategoryList(Array.isArray(rawData) ? rawData : []);
      } else {
        setError(response.message || 'Failed to fetch task categories');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch task categories');
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
    fetchTaskCategories();
  }, [fetchTaskCategories]);

  const handleAdd = useCallback(async (values: TaskCategoryFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { category, action } = values;
      const response = await taskCategoryService.create({ category, action });

      if (response.status) {
        const data = response.data as { id?: number } | undefined;
        if (data?.id) {
          setTaskCategoryList(prev => [...prev, { id: data.id, category, action } as TaskCategoryItem]);
        } else {
          fetchTaskCategories();
        }
        return true;
      } else {
        setError(response.message || 'Failed to add task category');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add task category');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTaskCategories]);

  const handleUpdate = useCallback(async (id: number, values: TaskCategoryFormData) => {
    setError('');
    setIsLoading(true);

    try {
      const { category, action } = values;
      const response = await taskCategoryService.update(id, { category, action });

      if (response.status) {
        setTaskCategoryList(prev => prev.map(item =>
          item.id === id ? { ...item, category, action } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update task category');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update task category');
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
      const response = await taskCategoryService.delete(id);

      if (response.status) {
        setTaskCategoryList(prev => prev.filter(item => item.id !== id));
        return true;
      } else {
        setError(response.message || 'Failed to delete task category');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete task category');
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
    taskCategoryList,
    isLoading,
    error,
    fetchTaskCategories,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
}
